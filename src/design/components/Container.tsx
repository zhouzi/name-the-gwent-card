import * as React from "react";
import styled from "styled-components";

const FullHeightWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const CenteredContainer = styled.main<{ variant?: "normal" | "large" }>`
  max-width: ${(props) => (props.variant === "large" ? "64rem" : "44rem")};
  width: 100%;
  padding: ${(props) => props.theme.spacing.large};
`;

interface Props {
  variant?: "normal" | "large";
  children: React.ReactNode;
}

export function Container({ variant, children }: Props) {
  return (
    <FullHeightWrapper>
      <CenteredContainer variant={variant}>{children}</CenteredContainer>
    </FullHeightWrapper>
  );
}
