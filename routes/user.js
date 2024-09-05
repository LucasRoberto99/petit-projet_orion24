const express = require("express");

// modèle User :)
const User = require("../models/User");

const router = express.Router();

// pacakage pour le mdp
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/user/signup", async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, password } = req.body;

    // verifications :
    if (!username || !email || !password) {
      return res.status(400).json({ message: "missing parameters" });
    }

    const userEmail = await User.findOne({ email: email });

    if (userEmail) {
      return res.status(409).json({ message: "email already in DB" });
    }

    // on génère un mdp !
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    // génération du token
    const token = uid2(16);

    const newUser = new User({
      username: username,
      email: email,
      token: token,
      hash: hash,
      salt: salt,
    });

    // console.log(newUser);

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
