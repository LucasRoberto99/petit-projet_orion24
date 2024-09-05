const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// import de mes router
const userRouter = require("./routes/user");

const app = express();
app.use(cors()); // autoriser tout le monde a me faire des requetes
app.use(express.json()); // recevoir les body

mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.json("bienvenue");
});

// utilisation de mes routes
app.use(userRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started on port 3000");
});
