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

    console.log(req.body.entry)

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.14,
      messages: [
        {
          role: "system",
          content:
            "You are a psychologist. You will be given diary entrys and you need to grade them on the scale of 'super negative', 'negative', 'neutral', 'positive', 'super positive'. Additionally you will categorize everything that's good and bad. Under no circumstances are you to rewrite a new diary entry.",
        },
        { role: "user", content: req.body.entry },
      ],
    }); 

    let messageText = aiResponse.choices[0].message.content;
    let splitString = messageText.split("\n");
    splitString.splice(1, 1);
    rating = splitString[0].replace("Grade: ", "");
    rating = splitString[0].replace("Grading: ", "");
    good = splitString[1].replace("Good things: ", "").split(",");
    good = splitString[1].replace("Good: ", "").split(",");
    bad = splitString[2].replace("Bad things: ", "").split(",");
    bad = splitString[2].replace("Bad: ", "").split(",");

    console.log(aiResponse.choices[0].message)

    let dateObj = new Date();
    let value = String(dateObj).split(' ')
    const newdate = value[1]+"/"+value[2]+"/"+value[3]

    const userRef = snapshot.docs[0].ref
    const data = snapshot.docs[0].data()
    data.entrys.push({entry: req.body.entry, mood: rating, date: newdate, title: req.body.title})
    data.negatives = data.negatives.concat(bad)
    data.positives = data.positives.concat(good)
    await userRef.update(data)

    return res.json({ airesponse: messageText });
  } catch (error) {
    console.log(error);
  }
}); 

router.post('/gettodo', async(req, res) => {
  const dataRef = db.collection("UserData");
  const snapshot = await dataRef.where("username", "==", req.body.name).get();

  if (snapshot.empty) {
    return res.status(404).json({ error: "User not found" });
  }
  const data = snapshot.docs[0].data()
  return res.status(200).json(data.todo)
})

router.post('/getprofile', async(req, res) => {
  const dataRef = db.collection("UserData");
  const snapshot = await dataRef.where("username", "==", req.body.name).get();

  if (snapshot.empty) {
    return res.status(404).json({ error: "User not found" });
  }
  const data = snapshot.docs[0].data()
  return res.status(200).json(data)
})

router.post('/todo', async (req, res) => {
  const dataRef = db.collection("UserData");
  const snapshot = await dataRef.where("username", "==", req.body.name).get();

  if (snapshot.empty) {
    return res.status(404).json({ error: "User not found" });
  }

  const userRef = snapshot.docs[0].ref
  const data = snapshot.docs[0].data()
  if (req.body.delete) {
    let todos = data.todo
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].name == req.body.todo) {
        todos.splice(i, 1)
      }
    }
    data.todo = todos
  } else {
    data.todo.push({name: req.body.todo, done: false})
  }
  userRef.update(data) 
  return res.status(200).json(data)

})

module.exports = router;
