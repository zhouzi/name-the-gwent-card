import * as React from "react";

interface CurrentUserContext {
  username: string;
}

export default React.createContext<CurrentUserContext>({
  username: "",
});
