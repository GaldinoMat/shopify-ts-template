import { LegacyCard, Page } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import React from "react";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Page>
      <LegacyCard>
        <LegacyCard.Section>
          <p>{t("NotFound.description")}</p>
        </LegacyCard.Section>
      </LegacyCard>
    </Page>
  );
}
