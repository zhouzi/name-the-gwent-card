import en from "./en";
import fr from "./fr";

const MESSAGES = {
  en,
  fr,
};

export type SupportedLocale = keyof typeof MESSAGES;

export const SUPPORTED_LOCALES = Object.keys(MESSAGES) as Array<
  SupportedLocale
>;

export default MESSAGES;
