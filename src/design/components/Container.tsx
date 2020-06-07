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

const CenteredContainer = styled.main`
  max-width: 44rem;
  width: 100%;
  padding: ${(props) => props.theme.spacing.large};
`;

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  return (
    <FullHeightWrapper>
      <CenteredContainer>{children}</CenteredContainer>
    </FullHeightWrapper>
  );
}
