const express = require("express");
const recipes = express.Router();
const Recipe = require("../models/recipes.js");

recipes.post("/", async (req, res) => {
  try {
    const createdRecipe = await Recipe.create(req.body);
    res.status(200).send(createdRecipe); // .json() will send proper headers in response so client knows it's json coming back
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
});

recipes.get("/", async (req, res) => {
  try {
    const foundRecipes = await Recipe.find({});
    res.status(200).send(foundRecipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
});

recipes.delete("/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
    res.status(200).send(deletedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
});

recipes.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true });
    res.status(200).send(updatedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
});

module.exports = recipes;