import * as React from "react";
import Fuse from "fuse.js";
import * as en from "./en";
import * as fr from "./fr";

export type SupportedLocale = "en" | "fr";

const SUPPORTED_LOCALES: Record<
  SupportedLocale,
  {
    messages: Record<string, string>;
    cards: GwentCard[];
  }
> = {
  en,
  fr,
};

const FUSE_OPTIONS = {
  keys: ["localizedName"],
  includeScore: true,
  minMatchCharLength: 3,
  shouldSort: true,
};

export interface LocaleContextContainer {
  locale: SupportedLocale;
  messages: Record<string, string>;
  cards: GwentCard[];
  fuse: Fuse<GwentCard, typeof FUSE_OPTIONS>;
  onChangeLocale: (locale: SupportedLocale) => void;
}

const LocaleContext = React.createContext<LocaleContextContainer>({
  ...getState("en"),
  onChangeLocale: () => {},
});

interface Props {
  children: React.ReactNode;
}

interface State {
  locale: SupportedLocale;
  messages: Record<string, string>;
  cards: GwentCard[];
  fuse: Fuse<GwentCard, typeof FUSE_OPTIONS>;
}

function getState(locale: SupportedLocale): State {
  const messages = SUPPORTED_LOCALES[locale].messages;
  const cards = SUPPORTED_LOCALES[locale].cards;
  const fuse = new Fuse(cards, FUSE_OPTIONS);

  return {
    locale,
    messages,
    cards,
    fuse,
  };
}

export function Provider({ children }: Props) {
  const [state, setState] = React.useState<State>(() => getState("en"));

  return (
    <LocaleContext.Provider
      value={{
        ...state,
        onChangeLocale: (locale: SupportedLocale) => {
          setState(getState(locale));
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
