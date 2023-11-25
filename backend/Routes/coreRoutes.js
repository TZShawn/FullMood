const express = require("express");
const router = express.Router();

const { db } = require("../config.js");

router.get("/entry", async (req, res) => {
  const dataRef = userDb.collection("UserData");
  const snapshot = await userRef.where("Name", "==", req.body.name).get();
  
  if (snapshot.empty) {
    return res.status(404).json({ error: "User not found" });
    
  }

  const data = snapshot.docs[0].data();

  return res.status(200).json({ data });
});

router.post("/entry");

router.put("/entry");
