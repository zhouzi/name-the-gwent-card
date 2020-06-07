import * as React from "react";
import styled from "styled-components";
import { Paragraph, Link } from "design/components";

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

export function Footer() {
  return (
    <FooterContainer>
      <FooterNav>
        <FooterNavList>
          <FooterNavListItem>
            <Link>Instructions</Link>
          </FooterNavListItem>
          <FooterNavListItem>
            <Link>Play with your viewers</Link>
          </FooterNavListItem>
          <FooterNavListItem>
            Inspired by <Link>Faberstein</Link>
          </FooterNavListItem>
          <FooterNavListItem>
            <Link>About/Code</Link>
          </FooterNavListItem>
          <FooterNavListItem>
            en / <Link>fr</Link>
          </FooterNavListItem>
        </FooterNavList>
      </FooterNav>
      <Paragraph>
        This is an unofficial fan work under the Gwent Fan Content Guidelines.
        Not approved/endorsed by CD PROJEKT RED.
      </Paragraph>
    </FooterContainer>
  );
}
