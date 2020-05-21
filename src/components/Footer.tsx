import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import Caption from "./Caption";
import Paragraph from "./Paragraph";
import Link from "./Link";

const FooterContainer = styled(Caption).attrs({ as: "footer" })`
  padding: 1rem 0;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Paragraph>
        <Link as={RouterLink} to="/">
          <FormattedMessage id="instructions" defaultMessage="Instructions" />
        </Link>{" "}
        -{" "}
        <Link as={RouterLink} to="/viewers">
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
        <Link href="https://github.com/zhouzi/guess-the-gwent-card">
          <FormattedMessage id="aboutCode" defaultMessage="About/Code" />
        </Link>
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
