const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

//!please use async
router.post("/create", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  // req.body.password = bcrypt.hash(req.body.password, 12)

  try {
    const createdUser = await User.create(req.body);
    console.log("created user is: ", createdUser);
    res.json({ status: "ok", message: "user created" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user === null) {
    return res.send("no such user");
  }

  const result = await bcrypt.compare(password, user.password);
  if (result) {
    req.session.currentUser = user;
    res.send("ok");
  } else {
    req.session.currentUser = null;
    res.send("no");
  }
});

router.delete("/logout", (req, res) => {
    req.session.destroy(()=> {})
  })

module.exports = router;
