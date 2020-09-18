import { createGlobalStyle } from "styled-components";
import { themeCSSVariablesDeclarations } from "design/theme";
import backgroundImage from "design/assets/bg-simple-1440.jpg";
import "modern-normalize/modern-normalize.css";

export const GlobalStyle = createGlobalStyle`
  :root {
    ${themeCSSVariablesDeclarations}
  }

  html {
    font-size: 14px;
    background-color: ${(props) => props.theme.colors.background.main};
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    min-height: 100vh;

    @media ${(props) => props.theme.breakpoints.up("small")} {
      font-size: 16px;
    }
  }

  body {
    font-family: ${(props) => props.theme.fonts.body};
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
    color: ${(props) => props.theme.colors.text.main};
  }
`;
