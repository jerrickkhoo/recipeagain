const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

//CRUD for use model
// to seed User
const seedUsers = require("../models/seed/seedUsers")
router.get("/seeduser", async (req, res) => {
  seedUsers.forEach((seedUser) => {
    seedUser.password = bcrypt.hashSync(seedUser.password, bcrypt.genSaltSync(10))
  })
  //console.log(typeof seedUsers[0].favourites)
  try {
    const createdSeedUsers = await User.create(seedUsers)
    res.status(200).json({ status: "ok", message: "seed users created", data: createdSeedUsers });
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to create seed user ", error: error });
  }
})

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
    res.status(200).json({ status: "ok", message: "user created", data: createdUser });
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to create user ", error: error });
  }
});

//READ INDIVIDUAL USER
router.get('/:userID', async (req, res) => {
  const { userID } = req.params
  try {
    const foundUser = await User.findOne({ id: userID })
    res.status(200).json({ status: "ok", message: "user found", data: foundUser })
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to find user ", error: error });
  }
})

//UPDATE a user credentials
router.put('/:userID', async (req, res) => {
  const { userID } = req.params
  console.log(req.body)
  try {
    const updatedUser = await User.findOneAndUpdate({ id: userID }, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      favourites: req.body.favourites, //FIXME: favourites array does not array properly 
      //$$addToSet: {favorites: [req.body.favorites]},
    },
      { new: true })
    res.status(200).json({ status: "ok", message: "user info updated", data: updatedUser })
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to update user info", error: error });
  }
})

//UPDATE need a separate update route to update user favourite? 

//DELETE a user
router.delete('/:userID', async (req, res) => {
  const { userID } = req.params
  try {
    const updatedUser = await User.findOneAndDelete({ id: userID })
    res.status(200).json({ status: "ok", message: "user deleted", data: updatedUser })
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to delete user ", error: error });
  }
})

//DELETE a user favourite aka when the user remove a recipe from their favourite


//Log in log out 
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  //TODO: check email to be in regex xx@xx. and password in right format, else throw error

  try {
    const foundUser = await User.findOne({ email:email });
    console.log(foundUser)
    if (!foundUser) {
      res.status(400).json({ status: "not ok", message: "user not found" });
    } else {
          const result = await bcrypt.compare(password, foundUser.password);
          if (result) {
            req.session.currentUser = foundUser;
            res.status(200).json({ status: "ok", message: "password matched, user is loggedin" })
          } else {
            req.session.currentUser = null;
            res.status(400).json({ status: "not ok", message:"password is not matched"})
          }
    }
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to log in user ", error: error });
  }
}
);

router.delete("/logout", (req, res) => {
  req.session.destroy(() => { })
  res.status(200).json({ status: "ok", message: "user is deleted" })
  //res.redirect("/")
})

module.exports = router;
