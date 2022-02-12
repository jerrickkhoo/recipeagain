const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

//CRUD for use model
//CREATE
router.post("/", async (req, res) => {

  //TODO: add validate username length is >3, does not exist in the database already
  // password must be at least 6 characters, consts of number and alphabets (how to make sure there is at least one special character?)

  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  const newUserInput = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  try {
    const createdUser = await User.create(newUserInput)
    console.log("created user is: ", createdUser);
    res.json({ status: "ok", message: "user created", data: createdUser});
  } catch (error) {
    res.json({ status: "not ok", message: "fail to create user ", error: error});
  }
});

//READ INDIVIDUAL USER
router.get('/', async(req,res)=>{
  try{
    const foundUser = await User.findOne()
  } catch{
    
  }

  
})
//UPDATE
//DELETE

//Log in log out 
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
