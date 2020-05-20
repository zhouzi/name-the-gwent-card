import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
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
          Instructions
        </Link>{" "}
        -{" "}
        <Link as={RouterLink} to="/play/viewers">
          Play with your viewers
        </Link>{" "}
        - Original idea from <Link href="#">Faberstein</Link> -{" "}
        <Link href="#">About/Code</Link>
      </Paragraph>
      <Paragraph>
        This is an unofficial fan work under the{" "}
        <Link href="https://www.playgwent.com/en/fan-content">
          Gwent Fan Content Guidelines
        </Link>
        . Not approved/endorsed by CD PROJEKT RED.
      </Paragraph>
    </FooterContainer>
  );
}
