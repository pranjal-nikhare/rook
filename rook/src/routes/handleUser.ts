import { Hono } from "hono";
import { sign } from "hono/jwt";
import zod from "zod";

// export const userRouter = new Hono<{
//     Bindings: {
//         DATABASE_URL: string;
//         JWT_SECRET: string;
//     }
// }>();

export const userRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

userRouter.post("/", async (c) => {
  const payload = await c.req.json();
  const body = signinSchema.safeParse(payload);

  if (!body.success) {
    return c.json({ message: "Zod Validation Error !" });
  }

  const username = body.data.username;
  const password = body.data.password;

  if (username === "admin" && password === "pranjal123") {
    //@ts-ignore
    const JWT_SECRET = await c.env.JWT_SECRET;

    const currTime = new Date().getTime();

    //@ts-ignore
    const signature = await sign(
      { username: "this is me", time: currTime },
      JWT_SECRET
    );
    const Authorization = "Bearer " + signature;

    return c.json({ Authorization });
  }
});

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
