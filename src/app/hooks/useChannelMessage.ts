import * as React from "react";
import { Events } from "tmi.js";
import createClient from "app/createClient";

export function useChannelMessage(
  channel: string | undefined,
  onMessage: Events["message"]
) {
  React.useEffect(() => {
    if (channel == null) {
      return;
    }

    const client = createClient();

    // FIXME: the asynchronicity and order of the calls is messed up
    // also, client.connect() is not aborted if a dependency changes before it's resolved
    client.connect().then(() => client.join(channel));

    client.on("message", onMessage);

    return () => {
      client.disconnect();
    };
  }, [channel, onMessage]);
}
