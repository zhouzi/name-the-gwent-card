import * as React from "react";
import { useIntl } from "react-intl";
import { useRouteMatch, useHistory, generatePath } from "react-router-dom";
import { Link } from "design/components";
import { useLocaleContext, SupportedLocale } from "app/i18n";
import { ROUTES } from "app/components/routes";

export function LocaleButton() {
  const { locale, onChangeLocale } = useLocaleContext();
  const intl = useIntl();
  const history = useHistory();
  const match = useRouteMatch<{ gameRules: string }>({
    path: ROUTES.SOLO_PLAY,
    exact: true,
  });

  if (locale === intl.locale) {
    return <>{intl.locale}</>;
  }

  return (
    <Link
      as="button"
      type="button"
      onClick={() => {
        if (
          match &&
          window.confirm(intl.formatMessage({ id: "changeLocaleWhilePlaying" }))
        ) {
          // I'm too lazy to do it right, sorry.
          onChangeLocale(intl.locale as SupportedLocale);
          history.push(generatePath(ROUTES.SOLO));
          return;
        }

        onChangeLocale(intl.locale as SupportedLocale);
      }}
    >
      {intl.locale}
    </Link>
  );
}
