const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

//CRUD for use model
//CREATE a new user
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
    //console.log("created user is: ", createdUser);
    res.status(200).json({ status: "ok", message: "user created", data: createdUser});
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to create user ", error: error});
  }
});

//READ INDIVIDUAL USER
router.get('/:userID', async(req,res)=>{
  const {userID} = req.params
  try{
    const foundUser = await User.findOne({id:userID})
    res.status(200).json({ status: "ok", message: "user found", data: foundUser})
  } catch(error){
    res.status(400).json({ status: "not ok", message: "fail to find user ", error: error});
  }
})
//UPDATE a user
router.put('/:userID', async(req,res)=>{
  const {userID} = req.params
  const updatedInfo = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    favorites: req.body.favorites,
  }
  try{
    const updatedUser = await User.findOneAndUpdate({id:userID},updatedInfo,{new:true})
    res.status(200).json({ status: "ok", message: "user info updated", data: updatedUser})
  } catch(error){
    res.status(400).json({ status: "not ok", message: "fail to update user info", error: error});
  }
})
//DELETE a user


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
