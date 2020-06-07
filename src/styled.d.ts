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
      };
    };
    spacing: {
      large: string;
      normal: string;
    };
  }
}
