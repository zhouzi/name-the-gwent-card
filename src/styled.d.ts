import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      heading: string;
      body: string;
    };
    colors: {
      primary: {
        main: string;
        lighter: string;
      };
      text: {
        main: string;
        light: string;
      };
      background: {
        dark: string;
        main: string;
        light: string;
      };
      danger: {
        main: string;
      };
      warning: {
        main: string;
      };
      success: {
        main: string;
      };
    };
    spacing: {
      large: string;
      normal: string;
    };
    breakpoints: {
      up: (breakpoint: "small") => string;
    };
  }
}
