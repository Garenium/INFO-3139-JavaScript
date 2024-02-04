import router from "./routes.js";
import { port } from "./config.js";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("\n\nHello world!\n\n");
});

app.use("/api/codelookup", router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
