import * as React from "react";
import { useIntl } from "react-intl";
import { Link } from "design/components";
import { useLocaleContext, SupportedLocale } from "app/i18n";

export function LocaleButton() {
  const { locale, onChangeLocale } = useLocaleContext();
  const intl = useIntl();

  if (locale === intl.locale) {
    return <>{intl.locale}</>;
  }

  return (
    <Link
      as="button"
      type="button"
      onClick={() => {
        onChangeLocale(intl.locale as SupportedLocale);
      }}
    >
      {intl.locale}
    </Link>
  );
}
