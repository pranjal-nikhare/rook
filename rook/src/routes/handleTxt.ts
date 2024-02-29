import { Hono } from "hono";
import { verify } from "hono/jwt";
import zod from "zod";
import { dbmanager } from "../dbHandler";

export const clipboardRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//auth middleware
clipboardRouter.use(async (c, next) => {
  const authToken = c.req.header("Authorization");
  if (!authToken) {
    return c.json({ error: "no token found !" });
  }
  const token = authToken.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);

  if (!payload) {
    c.status(401);
    return c.json({ error: "Invalid token !" });
  } else {
    await next();
  }
});

//add data to clipboard
const clipboardSchema = zod.object({
  data: zod.string(),
});

clipboardRouter.post("/", async (c) => {
  const payload = await c.req.json();
  const body = clipboardSchema.safeParse(payload);

  if (!body.success) {
    return c.json({ message: "Zod Validation Error !" });
  }

  const dbResp = await dbmanager(body.data, "insertOne", {});

  return c.json({ dbResp });
});

//get all data from clipboard
clipboardRouter.get("/", async (c) => {
  const dbResp = await dbmanager({}, "find", {});
  return c.json({ dbResp });
});

//delete a particular entry
clipboardRouter.delete("/", async (c) => {
  const payload = await c.req.json();

  const filter = { ...payload };
  const filterId = filter._id;
  //   return c.json({ filterId });

  const dbResp = await dbmanager({}, "deleteOne", filterId);
  return c.json({ dbResp });
});

//delete all entries
clipboardRouter.delete("/empty", async (c) => {
  const dbResp = await dbmanager({}, "deleteMany", {});
  return c.json({ dbResp });
});

//, action: string
// async function dbmanager(data: object, method: string , {}) {
// async function dbmanager(method: string = "find") {
// const datah =
// if (data !== {}) {
//     var dcoument : {
//         time: new Date(),
//         ...data
//     }
// } else {

// }

//   if (method === "insertOne") {
//     var requestData = JSON.stringify({
//       collection: "collection 1",
//       database: "temporary",
//       dataSource: "Cluster0",
//       document: {
//         time: new Date(),
//         ...data,
//       },
//     });
//   } else if (method === "delete") {
//     var requestData = JSON.stringify({
//       collection: "collection 1",
//       database: "temporary",
//       dataSource: "Cluster0",
//       filter: {},
//     });
//   } else {
//     var requestData = JSON.stringify({
//       collection: "collection 1",
//       database: "temporary",
//       dataSource: "Cluster0",
//     });
//   }

//   var requestData = JSON.stringify({
//     collection: "collection 1",
//     database: "temporary",
//     dataSource: "Cluster0",
//     // document: {
//     //   time: new Date(),
//     //   ...data,
//     // },
//   });

//   var requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "api-key":
//         "PskFuRUjPnWM70Rgztsk0Q9NaCVIxFyuJQlts1tgvVYnAnIVPqqY0lk69xjaoIoP",
//     },
//     body: requestData,
//     redirect: "follow",
//   };
//   var statement = "Error in inserting data";

//   var roz = "";
//   //   const link =
//   //     "https://ap-south-1.aws.data.mongodb-api.com/app/data-omnqg/endpoint/data/v1/action/" +
//   //     method;

//   await fetch(
//     "https://ap-south-1.aws.data.mongodb-api.com/app/data-omnqg/endpoint/data/v1/action/" +
//       method,
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       // console.log(JSON.stringify(result));
//       roz = JSON.stringify(result);
//     })
//     .catch((error) => console.log("error", error));
//   //   return link;
//   return roz;
// }
