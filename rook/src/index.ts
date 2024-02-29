import { Hono } from "hono";

import { clipboardRouter } from "./routes/handleTxt";
import { userRouter } from "./routes/handleUser";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/signin", userRouter);
app.route("/api/clipboard", clipboardRouter);

export default app;
