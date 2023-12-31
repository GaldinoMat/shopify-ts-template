import React, { useState } from 'react';
import { Text, LegacyCard, VerticalStack } from '@shopify/polaris';
import { Toast } from '@shopify/app-bridge-react';
import { useTranslation } from 'react-i18next';
import { useAppQuery, useAuthenticatedFetch } from '../hooks';

interface IToastProps {
  content: string;
  error?: boolean;
}

export function ProductsCard() {
  const emptyToastProps = { content: '', error: false };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState<IToastProps>(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const productsCount = 5;

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: '/api/products/count',
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast
      {...toastProps}
      onDismiss={() => {
        setToastProps(emptyToastProps);
      }}
    />
  );

  const handlePopulate = () => {
    void (async () => {
      setIsLoading(true);
      const response = await fetch('/api/products/create');

      if (response.ok) {
        await refetchProductCount();
        setToastProps({
          content: t('ProductsCard.productsCreatedToast', {
            count: productsCount,
          }),
        });
      } else {
        setIsLoading(false);
        setToastProps({
          content: t('ProductsCard.errorCreatingProductsToast'),
          error: true,
        });
      }
    })();
  };

  return (
    <>
      {toastMarkup}
      <LegacyCard
        title={t('ProductsCard.title')}
        sectioned
        primaryFooterAction={{
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          content: t('ProductsCard.populateProductsButton', {
            count: productsCount,
          }) as string,
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <VerticalStack gap="5">
          <p>{t('ProductsCard.description')}</p>
          <Text as="h4" variant="headingMd">
            {t('ProductsCard.totalProductsHeading')}
            <Text variant="bodyMd" as="p" fontWeight="semibold">
              {isLoadingCount ? '-' : data.count}
            </Text>
          </Text>
        </VerticalStack>
      </LegacyCard>
    </>
  );
}
