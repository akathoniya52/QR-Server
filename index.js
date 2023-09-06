const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;
const cors = require("cors");
const URI = "mongodb+srv://akathoniya52:amit@cluster0.xqhjwu6.mongodb.net/";

app.use(cors());
app.use(express.json());

// mongoose connnection
const db = mongoose
  .connect(URI)
  .then((data) => {
    console.log("Database connected");
    app.listen(PORT, console.log(`Server Started at PORT : ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

//   user model

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  linkArr: {
    type: [],
    required: true,
  },
});

const User = mongoose.model("qrs", userSchema);

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const us = new User();
    (us.id = req.body.link), (us.linkArr = req.body.linkArr);
    const dc = await us.save();
    console.log(dc);
    return res.json({ message: "sucees", data: req.body.model });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Something went wrong" });
  }
});

app.get("/:id", async (req, res) => {
  const id1 = req.originalUrl.slice(1);
  const data = await User.find({ id: id1 });
  console.log(data);
  console.log(id1);

  return res.json({ message: `${id1} `, data: data });
});

app.get("/", (req, res) => {
  return res.json({ message: "Server works properly" });
});
