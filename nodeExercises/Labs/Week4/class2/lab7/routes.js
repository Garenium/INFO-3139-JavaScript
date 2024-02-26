import { Router } from "express";
import { Lab7Function } from "./lab7.js";
const router = Router();
// define a default route
router.get("/api/codelookup/", (req, res) => {
  res
    .status(200)
    .send({ msg: `this would be a response from the default route` });
});
// define a get route with a name parameter
router.get("/:name", async (req, res) => {
  let name = req.params.name;

  try{

    let country = await Lab7Function(name);
    const htmlResponseGood = `
      <html> 
        <body>The code ${country.Code} belongs to the country of ${country.Name}</body>
      </html>
      `;
    res
      .status(200)
      .send(htmlResponseGood);
  } catch(err){
    console.log(err);
    const htmlResponseBad = `
      <html> 
        <body>The code ${name} is not a known country alpha-2 code</body>
      </html>
      `;
    res
      .status(500)
      .send(htmlResponseBad);
  }
});
export default router;
