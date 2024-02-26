import { port } from "./config.js";
import {collection, db} from "./config.js";
import express from "express";
import user_router from "./user_routes.js";

console.log("collection: "+collection + " db: " + db);

const app = express();

// app.use((req, res, next) => {
//   console.log("Time:", new Date() + 3600000 * -5.0); // GMT-->EST
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("\n\nHello world!\n\n");
// });

// app.use(express.static('public'));
// app.use("/thisapp", router);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/users", user_router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
