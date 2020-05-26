import { Client } from "tmi.js";

export default function createClient() {
  return Client({
    options: {
      debug: process.env.NODE_ENV === "development",
    },
    connection: {
      secure: true,
      reconnect: true,
    },
  });
}
