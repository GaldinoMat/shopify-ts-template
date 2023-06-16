// @ts-check
import { join } from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import serveStatic from 'serve-static';

import shopify from './shopify';
import GDPRWebhookHandlers from './gdpr';
import type { ProcessWebhooksMiddlewareParams } from '@shopify/shopify-app-express';
import productCreator from './product-creator';

const PORT = parseInt(
  process.env.BACKEND_PORT ?? process.env.PORT ?? '3000',
  10
);

const buildStaticPaths = (): string => {
  process.chdir('../');

  return process.env.NODE_ENV === 'production'
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;
};

const STATIC_PATH = buildStaticPaths();

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);

app.post(
  shopify.config.webhooks.path,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  shopify.processWebhooks({
    webhookHandlers: GDPRWebhookHandlers,
  } as ProcessWebhooksMiddlewareParams)
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js
app.use('/api/*', shopify.validateAuthenticatedSession());

app.use(express.json());

app.get('/api/products/count', (_req, res) => {
  void (async () => {
    try {
      const countData = await shopify.api.rest.Product.count({
        session: res.locals.shopify.session,
      });
      res.status(200).send(countData);
    } catch (error) {
      res.status(500).json();
    }
  })();
});

app.get('/api/products/create', (_req, res) => {
  void (async () => {
    let status = 200;
    let error = null;

    try {
      await productCreator(res.locals.shopify.session);
    } catch (e: any) {
      const failMessage: string = e.message;
      console.log(`Failed to process products/create: ${failMessage}`);
      status = 500;
      error = e.message;
    }
    res.status(status).send({ success: status === 200, error });
  })();
});

// REST call example
app.get('/api/collection', (req, res) => {
  void (async () => {
    try {
      const countData = await shopify.api.rest.Collection.find({
        session: res.locals.shopify.session,
        id: 282714669113, // you collection id here
      });
      res.status(200).json(countData);
    } catch (e: any) {
      const failMessage: string = e.message;
      console.log(`Failed to get collections: ${failMessage}`);
      res.status(400).json();
    }
  })();
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use('/*', shopify.ensureInstalledOnShop(), (_req, res, _next) => {
  void (async () => {
    return res
      .status(200)
      .set('Content-Type', 'text/html')
      .send(readFileSync(join(STATIC_PATH, 'index.html')));
  })();
});

app.listen(PORT);
