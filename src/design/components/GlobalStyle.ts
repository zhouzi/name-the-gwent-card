import { createGlobalStyle } from "styled-components";
import { themeCSSVariablesDeclarations } from "design/theme";
import "modern-normalize/modern-normalize.css";

export const GlobalStyle = createGlobalStyle`
  :root {
    ${themeCSSVariablesDeclarations}
  }

  html {
    font-size: 16px;
  }

  body {
    font-size: 1rem;
    line-height: 1.5;
  }
`;
