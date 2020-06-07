import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {};

function isObject(value: any): boolean {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function toCSSVariables(theme: Object, ancestors: string[] = []): Object {
  return (Object.keys(theme) as Array<keyof typeof theme>).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key]: isObject(theme[key])
          ? toCSSVariables(theme[key], ancestors.concat([key]))
          : `var(--${ancestors.concat([key]).join("-")})`,
      }),
    {}
  );
}

function toCSS(theme: Object, ancestors: string[] = []): string {
  return (Object.keys(theme) as Array<keyof typeof theme>)
    .map((key) => {
      if (isObject(theme[key])) {
        return toCSS(theme[key], ancestors.concat([key]));
      }

      return `--${ancestors.concat([key]).join("-")}: ${theme[key]};`;
    })
    .join("\n");
}

export const themeCSSVariables: DefaultTheme = toCSSVariables(
  theme
) as DefaultTheme;

export const themeCSSVariablesDeclarations: string = toCSS(theme);
