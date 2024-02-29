import { Hono } from "hono";

// import { userRouter } from "./routes/user";
// import { bookRouter } from "./routes/blog";

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

// import { Hono } from "hono";
// import { sign, verify } from "hono/utils/jwt/jwt";
// import { jwt } from "hono/jwt";
// import zod from "zod";
// import { bearerAuth } from "hono/bearer-auth";

// const app = new Hono();

// interface Env {
//   secret: string;
// }

// //authenticate
// //use username and password to authenticate

// const signinSchema = zod.object({
//   username: zod.string(),
//   password: zod.string(),
// });

// app.post("/", async (c) => {
//   const payload = await c.req.json();
//   const body = signinSchema.safeParse(payload);

//   if (!body.success) {
//     return c.json({ message: "Zod Validation Error !" });
//   }

//   const username = body.data.username;
//   const password = body.data.password;

//   if (username === "admin" && password === "pranjal123") {
//     //@ts-ignore
//     const JWT_SECRET = await c.env.JWT_SECRET;

//     //@ts-ignore
//     const signature = await sign({ username: "this is me" }, JWT_SECRET);
//     // const jwt = await sign({ id: "user.id fvdfvdfv" }, c.env.JWT_SECRET);
//     const token = "Bearer " + signature;
//     return c.json({ token });
//   } else {
//     return c.json({ message: "Invalid username or password" });
//   }
// });

// app.use(
//   "/verify/*",
//   jwt({
//     secret:
//       "ON387iubdfiuvb98berw98vbU9B87GUHBUyv78yv8yb8yb7TVC7TYUVY8BV7T6RC5ex4ez4x5rc6vt7b8b8YV6R5XEx",
//   })
// );

// //clipboard - send the data and store it in the database
// const zodSchema = zod.object({
//   data: zod.string(),
// });

// app.post("/verify/addtext", async (c) => {
//   const payload = await c.req.json();

//   // return c.json(payload);
//   const body = zodSchema.safeParse(payload);

//   if (!body.success) {
//     return c.json({ message: "Zod Validation Error !" });
//   }
//   return c.text("Clipboard");
// });

// //get latest post
// app.get("/", (c) => {
//   return c.text("Hello Hono!");
// });

// //get all posts
// app.get("/all", (c) => {
//   return c.text("All Posts");
// });

// export default app;
