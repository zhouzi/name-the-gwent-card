import * as React from "react";
import * as en from "./en";
import * as fr from "./fr";

const SUPPORTED_LOCALES = {
  en,
  fr,
};

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;

export interface LocaleContextContainer {
  locale: SupportedLocale;
  cards: GwentCard[];
  onChangeLocale: (locale: SupportedLocale) => void;
}

const LocaleContext = React.createContext<LocaleContextContainer>({
  locale: "en",
  cards: SUPPORTED_LOCALES.en.cards,
  onChangeLocale: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function Provider({ children }: Props) {
  const [state, setState] = React.useState<{
    locale: SupportedLocale;
    cards: GwentCard[];
  }>({
    locale: "en",
    cards: SUPPORTED_LOCALES.en.cards,
  });

  return (
    <LocaleContext.Provider
      value={{
        ...state,
        onChangeLocale: (locale) => {
          setState((currentState) => ({
            ...currentState,
            locale,
            cards: SUPPORTED_LOCALES[locale].cards,
          }));
        },
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export const Consumer = LocaleContext.Consumer;

export function useLocaleContext() {
  return React.useContext(LocaleContext);
}
