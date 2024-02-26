import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import { Router } from "express";
const user_router = Router();
// define a default route to retrieve all users
user_router.get("/", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let users = await dbRtns.findAll(db, cfg.collection);
    res.status(200).send({ users: users });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

//define a get route with a name parameter to retrieve 1 user
user_router.get("/:name", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let name = { name: req.params.name };
    console.log(name);
    let user = await dbRtns.findOne(db, cfg.collection, name);

    if(user){
      res.status(200).send({ User: user });
    } else{
      res.status(404).send({ "msg": `${name.name} does not exist in users`});
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

//define a post route to add a user, ensure a body-parser has been installed
user_router.post("/", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let name = req.body;
    console.log(name);
    await dbRtns.addOne(db, cfg.collection, name);
    res.status(200).send({ msg: `document ${name.name} added to users collection` });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
  }
});

//define a put route to update a user, ensure body-parser has been installed
user_router.put("/", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let user = req.body;
    let updateResults = await dbRtns.updateOne(
      db,
      cfg.collection,
      { name: user.name },
      { age: user.age, email: user.email }
    );

    if (updateResults) {
      res
        .status(200)
        .send({ msg: `User data for ${req.body.name} was updated` });
    } else {
      res.status(200).send({ msg: `User data was not updated` });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Update user failed - internal server error");
  }
});

//define a delete route to remove a user based on name
user_router.delete("/:name", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let name = req.params.name;
    let deleteUser = await dbRtns.deleteOne(db, cfg.collection, { name: name });
    if (deleteUser.deletedCount > 0) {
      res.status(200).send({
        msg: `1 user was deleted`,
      });
    } else {
      res.status(404).send({
        msg: `user not deleted or doesn't exist`,
      });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("could NOT find user");
  }
});

export default user_router;

