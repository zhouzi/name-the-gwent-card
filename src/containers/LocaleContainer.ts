import * as React from "react";
import messages from "../messages";

export default React.createContext({
  onChange: (locale: keyof typeof messages) => {},
});
