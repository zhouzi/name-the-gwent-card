import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Caption, Paragraph, Link } from "design";
import ROUTES from "app/ROUTES";
import messages from "app/messages";
import { LocaleContext } from "app/containers";

const FooterContainer = styled(Caption).attrs({ as: "footer" })`
  padding: 1rem 0;
`;

export default function Footer() {
  const intl = useIntl();
  const { onChange } = React.useContext(LocaleContext);

  return (
    <FooterContainer>
      <Paragraph>
        <Link as={RouterLink} to={ROUTES.HOMEPAGE}>
          <FormattedMessage id="instructions" defaultMessage="Instructions" />
        </Link>{" "}
        -{" "}
        <Link as={RouterLink} to={ROUTES.VIEWERS}>
          <FormattedMessage
            id="playWithViewers"
            defaultMessage="Play with your viewers"
          />
        </Link>{" "}
        -{" "}
        <FormattedMessage
          id="inspiredBy"
          defaultMessage="Inspired by <a>Faberstein</a>"
          values={{
            a: (children: string) => (
              <Link href="https://twitch.tv/faberstein">{children}</Link>
            ),
          }}
        />{" "}
        -{" "}
        <Link href="https://github.com/zhouzi/name-the-gwent-card">
          <FormattedMessage id="aboutCode" defaultMessage="About/Code" />
        </Link>{" "}
        -{" "}
        {(Object.keys(messages) as Array<keyof typeof messages>).map(
          (locale, index, arr) => (
            <React.Fragment key={locale}>
              {intl.locale === locale ? (
                <strong>{locale}</strong>
              ) : (
                <Link
                  as="button"
                  type="button"
                  onClick={() => onChange(locale)}
                >
                  {locale}
                </Link>
              )}
              {index < arr.length - 1 && <> / </>}
            </React.Fragment>
          )
        )}
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          id="unofficialFanWork"
          defaultMessage="This is an unofficial fan work under the <a>guidelines</a>. Not approved/endorsed by CD PROJEKT RED."
          values={{
            a: (children: string) => (
              <Link href="https://www.playgwent.com/en/fan-content">
                {children}
              </Link>
            ),
          }}
        />
      </Paragraph>
    </FooterContainer>
  );
}
