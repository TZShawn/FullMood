const express = require("express");
const router = express.Router();

const { db } = require("../config.js");

router.post("/user", async (req, res) => {
  const data = req.body;
  const userRef = db.collection("Users");
  const dataRef = db.collection("UserData")

  const snapshot = await userRef.where("Name", "==", data.Name).get();

  if (snapshot.empty) {
    console.log("RAN")
    const res2 = await userRef.add(req.body);
    const userDataCreation = {
      username: req.body.Name,
      entrys: [],
      mood: [],
      todo: [],
    }
    console.log("RAN")
    const res3 = await dataRef.add(userDataCreation)
    res.send({ status: 200, data: userDataCreation});
  } else {
    return res.status(400).json({ error: "User already Exists" })
  }
});

router.get("/user", async (req, res) => {
  const { name } = req.body;
  const userRef = db.collection("Users");
  const snapshot = await userRef.where("Name", "==", name).get();


  if (snapshot.empty) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = snapshot.docs[0].data();

  return res.json({ password: user.Password });
});

module.exports = router;
