import { Card, EmptyState, Page } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import React from "react";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Page>
      <Card>
        <Card.Section>
          <p>{t("NotFound.description")}</p>
        </Card.Section>
      </Card>
    </Page>
  );
}
