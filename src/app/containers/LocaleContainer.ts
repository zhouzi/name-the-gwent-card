import * as React from "react";
import messages from "app/messages";

export default React.createContext({
  onChange: (locale: keyof typeof messages) => {},
});
