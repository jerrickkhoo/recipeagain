const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const session = require("express-session");
const seedUsers = require("../models/seed/seedUsers")


//  MIDDLEWARE
const isLoggedIn = (req,res,next)=>{
  if (req.session.currentUser){
    return next()
  } else {
    res.redirect("/login")
  }
}

//CRUD for use model
// to seed User
router.get("/seedUser", async (req, res) => {
  seedUsers.forEach((seedUser) => {
    seedUser.password = bcrypt.hashSync(seedUser.password, bcrypt.genSaltSync(10))
  })
  try {
    await User.deleteMany({})
    const createdSeedUsers = await User.create(seedUsers)
    res.status(200).json({ status: "ok", message: "seed users created", data: createdSeedUsers });
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to create seed user ", error: error });
  }
})

//CREATE a new user
router.post("/join", async (req, res) => {
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
    res.status(200).json({ status: "ok", message: "user created", data: createdUser });
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to create user ", error: error });
  }
});


//Log in log out, this needs to be above other routes that use params
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  //TODO: check email to be in regex xx@xx. and password in right format, else throw error
  try {
    const foundUser = await User.findOne({ email:email });
    console.log(foundUser)
    if (!foundUser) {
      res.status(400).json({ status: "not ok", message: "email and/or password is invalid" })
    } else {
          const result = await bcrypt.compare(password, foundUser.password);
          if (result) {
            req.session.currentUser = foundUser;
            res.status(200).json({ status: "ok", message: "user is loggedin", data:foundUser })
          } else {
            req.session.currentUser = null;
            res.status(400).json({ status: "not ok", message:"email and/or password is invalid"})
          }
    }
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to log in user ", error: error });
  }
}
);

router.post("/logout",isLoggedIn,(req, res) => {
  req.session.destroy((err) => { 
    if (err){
      res.status(400).json({ status: "not ok", message: "logout was unsuccessful", error: error })
    } else{
      res.status(200).json({ status: "ok", message: "logout was successful" })
    }
  })

})

//READ INDIVIDUAL USER

router.get('/:userID',isLoggedIn, async (req, res) => {
  const { userID } = req.params
  //TODO: add  a if condition req.session.currentUser.id === userID to make sure user can only access their own data, not other user
  try {
    const foundUser = await User.findOne({ email: userID })
    res.status(200).json({ status: "ok", message: "user found", data: foundUser })
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to find user ", error: error });
  }
})

//UPDATE a user credentials
router.put('/:userID', isLoggedIn,async (req, res) => {
  const { userID } = req.params
  //console.log(req.body)
  try {
    const updatedUser = await User.findOneAndUpdate({ email: userID }, {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
      favourites: req.body.favourites, //FIXME: favourites array does not array properly 
      //$$addToSet: {favorites: [req.body.favorites]},
    },
      { new: true })
    res.status(200).json({ status: "ok", message: "user info updated", data: updatedUser })
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to update user info", error: error });
  }
})

//UPDATE need a separate update route to update a user favourite? 

//DELETE a user
router.delete('/:userID', isLoggedIn, async (req, res) => {
  const { userID } = req.params
  try {
    const updatedUser = await User.findOneAndDelete({ email: userID })
    res.status(200).json({ status: "ok", message: "user deleted", data: updatedUser })
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to delete user ", error: error });
  }
})

//DELETE a user favourite aka when the user remove a recipe from their favourite

module.exports = router;
