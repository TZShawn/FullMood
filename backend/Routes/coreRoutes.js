const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const OpenAI = require("openai").OpenAI;
const openai = new OpenAI();

const { db } = require("../config.js");

router.get("/entry", async (req, res) => {
  const dataRef = db.collection("UserData");
  const snapshot = await dataRef.where("username", "==", req.body.name).get();
  if (snapshot.empty) {
    return res.status(404).json({ error: "User not found" });
  }

  const data = snapshot.docs[0].data();

  return res.status(200).json({ data });
});

router.post("/entry", async (req, res) => {
  try {
    const dataRef = db.collection("UserData");
    const snapshot = await dataRef.where("username", "==", req.body.name).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.14,
      messages: [
        {
          role: "system",
          content:
            "You are a psychologist. You will be given diary entrees and you need to grade them on the scale of 'super negative', 'negative', 'neutral', 'positive', 'super positive'. Additionally you will categorize everything that's good and bad.",
        },
        { role: "user", content: req.body.entry },
      ],
    }); 

    let messageText = aiResponse.choices[0].message.content;
    let splitString = messageText.split("\n");
    splitString.splice(1, 1);
    rating = splitString[0].replace("Grading: ", "");
    good = splitString[1].replace("Good things: ", "").split(",");
    good = splitString[1].replace("Good: ", "").split(",");
    bad = splitString[2].replace("Bad things: ", "").split(",");
    bad = splitString[2].replace("Bad: ", "").split(",");

    const userRef = snapshot.docs[0].ref
    const data = snapshot.docs[0].data()
    console.log(data)
    data.entrys.push({entry: req.body.entry, mood: rating, date: new Date()})
    data.negatives = data.negatives.concat(bad)
    data.postiives = data.postiives.concat(good)
    await userRef.update(data)

    return res.json({ airesponse: messageText });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
