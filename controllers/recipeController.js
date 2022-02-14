const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes.js");
const seedRecipes = require("../models/seed/seedRecipes")


//  MIDDLEWARE
// const isLoggedIn = (req,res,next)=>{
//   if (req.session.currentUser){
//     return next()
//   } else {
//     res.redirect("/login")
//   }
// }

//READ all recipes
//to seed recipes

router.get("/seedRecipe", async (req, res) => {
  try {
    await Recipe.deleteMany({})
    const createdSeedRecipes = await Recipe.create(seedRecipes);
    res.status(200).json({ status: "ok", message: "seed recipes created", data: createdSeedRecipes });
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to create seed recipes ", error: error });
  };
});

// router.post("/",isLoggedIn,  async (req, res) => {
//   try {
//     const createdRecipe = await Recipe.create(req.body);
//     res.status(200).send(createdRecipe); // .json() will send proper headers in response so client knows it's json coming back
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   };
// });



// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
//     res.status(200).send(deletedRecipe);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   };
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedRecipe = await Recipe.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true });
//     res.status(200).send(updatedRecipe);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   };
// });

module.exports = router;