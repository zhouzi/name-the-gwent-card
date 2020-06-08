import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Paragraph, Link } from "design/components";
import { useLocaleContext, SUPPORTED_LOCALES, SupportedLocale } from "app/i18n";
import { ROUTES } from "./routes";

const FooterContainer = styled.footer`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.light};
  padding: ${(props) => props.theme.spacing.normal} 0;
`;

const FooterNav = styled.nav`
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

const FooterNavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const FooterNavListItem = styled.li`
  display: inline;

  &:not(:last-child)::after {
    content: " - ";
  }
`;

const LocaleItem = styled.span`
  &:not(:last-child)::after {
    content: " / ";
  }
`;

export function Footer(props: {}) {
  const { locale, onChangeLocale } = useLocaleContext();

  return (
    <FooterContainer {...props}>
      <FooterNav>
        <FooterNavList>
          <FooterNavListItem>
            <Link as={RouterLink} to={ROUTES.INSTRUCTIONS}>
              <FormattedMessage id="instructions" />
            </Link>
          </FooterNavListItem>
          <FooterNavListItem>
            <Link>
              <FormattedMessage id="playWithTwitchChat" />
            </Link>
          </FooterNavListItem>
          <FooterNavListItem>
            <FormattedMessage
              id="inspiredBy"
              values={{
                a: (children: string) => (
                  <Link href="https://twitch.tv/faberstein">{children}</Link>
                ),
              }}
            />
          </FooterNavListItem>
          <FooterNavListItem>
            <Link href="https://github.com/zhouzi/name-the-gwent-card">
              <FormattedMessage id="aboutCode" />
            </Link>
          </FooterNavListItem>
          <FooterNavListItem>
            {(Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).map(
              (otherLocale) => (
                <LocaleItem key={otherLocale}>
                  {otherLocale === locale ? (
                    otherLocale
                  ) : (
                    <Link
                      as="button"
                      type="button"
                      onClick={() => onChangeLocale(otherLocale)}
                    >
                      {otherLocale}
                    </Link>
                  )}
                </LocaleItem>
              )
            )}
          </FooterNavListItem>
        </FooterNavList>
      </FooterNav>
      <Paragraph>
        <FormattedMessage id="disclaimer" />
      </Paragraph>
    </FooterContainer>
  );
}
