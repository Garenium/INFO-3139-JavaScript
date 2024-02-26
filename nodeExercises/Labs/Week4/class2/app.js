import router from "./routes.js";
import { port } from "./config.js";
import express from "express";

const app = express();

// app.use((req, res, next) => {
//   console.log("Time:", new Date() + 3600000 * -5.0); // GMT-->EST
//   next();
// });

app.get("/", (req, res) => {
  res.send("\n\nHello world!\n\n");
});

app.use(express.static('public'));
app.use("/thisapp", router);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
