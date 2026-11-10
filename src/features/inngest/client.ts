
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "nova0-build",
  isDev: process.env.NODE_ENV === "development" || process.env.INNGEST_DEV === "1",
});