export async function dbmanager(data: object, method: string, filterr: object) {
  if (method === "insertOne") {
    var requestData = JSON.stringify({
      collection: "collection 1",
      database: "temporary",
      dataSource: "Cluster0",
      document: {
        time: new Date(),
        ...data,
      },
    });
  } else if (method === "delete") {
    var requestData = JSON.stringify({
      collection: "collection 1",
      database: "temporary",
      dataSource: "Cluster0",
      filter: {
        ...filterr,
      },
    });
  } else if (method === "find") {
    var requestData = JSON.stringify({
      collection: "collection 1",
      database: "temporary",
      dataSource: "Cluster0",
      filter: {},
    });
  } else if (method === "deleteOne") {
    //@ts-ignore
    var _id = filterr._id;

    var requestData = JSON.stringify({
      collection: "collection 1",
      database: "temporary",
      dataSource: "Cluster0",
      filter: {
        _id,
      },
    });
  } else if (method === "deleteMany") {
    var requestData = JSON.stringify({
      collection: "collection 1",
      database: "temporary",
      dataSource: "Cluster0",
      filter: {},
    });
  } else {
    var requestData = JSON.stringify({
      collection: "collection 1",
      database: "temporary",
      dataSource: "Cluster0",
    });
  }

  //   var requestData = JSON.stringify({
  //     collection: "collection 1",
  //     database: "temporary",
  //     dataSource: "Cluster0",
  //     // filter: {},
  //     //   document: {
  //     //     time: new Date(),
  //     //     ...data,
  //     //   },
  //   });

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key":
        "PskFuRUjPnWM70Rgztsk0Q9NaCVIxFyuJQlts1tgvVYnAnIVPqqY0lk69xjaoIoP",
    },
    body: requestData,
    redirect: "follow",
  };
  var statement = "Error in inserting data";

  var roz = "";

  await fetch(
    "https://ap-south-1.aws.data.mongodb-api.com/app/data-omnqg/endpoint/data/v1/action/" +
      method,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log(JSON.stringify(result));
      roz = JSON.stringify(result);
    })
    .catch((error) => console.log("error", error));

  return roz;
}
