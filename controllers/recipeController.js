const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes.js");
const seedRecipes = require("../models/seed/seedRecipes")
const { NewRecipeValidationSchema } = require("../validation")

//MIDDLEWARE
const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    //res.redirect("/login")
    res.status(401).json({ status: "not ok", message: "user is not authorized"});
  }
}

//to seed recipes
// router.get("/seedRecipe", async (req, res) => {
//   try {
//     await Recipe.deleteMany({})
//     const createdSeedRecipes = await Recipe.insertMany(seedRecipes);
//     res.status(200).json({ status: "ok", message: "seed recipes created", data: createdSeedRecipes });
//   } catch (error) {
//     res.status(400).json({ status: "not ok", message: "fail to create seed recipes ", error: error });
//   };
// });

//READ all recipes
router.get("/", async (req, res) => {
  try {
    const allRecipes = await Recipe.find({}).populate('ratings', 'rating');
    res.status(200).json({ status: "ok", message: "all recipes fetched", data: allRecipes });
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to fetch all recipes ", error: error });
  };
})

//Create a new recipe 
router.post("/new", isLoggedIn, async (req, res) => {
  //validate req.body
  const input = req.body
  const { error } = NewRecipeValidationSchema.validate({
    name: input.name,
    description: input.description,
    servings: input.servings,
    duration: input.duration,
    // tags: input.tags
  })
  try {
    if (error) {
      res.status(400).json({ status: "not ok", message: "fail to create a new recipe ", error });
    }
    const createdRecipe = await Recipe.create(req.body);
    res.status(200).json({ status: "ok", message: "new recipe created", data: createdRecipe }); // .json() will send proper headers in response so client knows it's json coming back
  } catch (err) {
    res.status(400).json({ status: "not ok", message: "fail to create a new recipe ", error: err });
  };

});

//READ a recipe 
router.get("/:id", async (req, res) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.id).populate("author", "username");
    res.status(200).json({ status: "ok", message: "one recipe fetched ", data: foundRecipe });
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to fetch the requested recipe ", error: error });
  };
});

//DELETE a recipe 
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
    res.status(200).json({ status: "ok", message: "recipe deleted", data: deletedRecipe });
  } catch (error) {
    res.status(400).json({ status: "not ok", message: "fail to delete recipe ", error: error });
  };
});

//UPDATE a recipe details
router.put("/:id", isLoggedIn, async (req, res) => {
  //validate req.body
  const input = req.body
  const { error } = NewRecipeValidationSchema.validate({
    name: input.name,
    description: input.description,
    servings: input.servings,
    duration: input.duration,
    // tags: input.tags
  })
  if (error) {
    res.status(400).json({ status: "not ok", message: "fail to update the recipe ", error });
  }
  else {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true });
      res.status(200).json({ status: "ok", message: "recipe updated", data: updatedRecipe });
    } catch (err) {
      res.status(400).json({ status: "not ok", message: "fail to update recipe ", error: err });
    };
  }
});

module.exports = router;