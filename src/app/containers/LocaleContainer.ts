import * as React from "react";
import messages from "app/messages";

export const LocaleContext = React.createContext({
  onChange: (locale: keyof typeof messages) => {},
});
