const express = require("express");
const router = express.Router();
const Rating = require("../models/ratings.js");
const Recipe = require("../models/recipes.js");
const User = require("../models/users.js");

//!create
router.post("/", async (req, res) => {
  const userId = req.body?.userId;
  const recipeId = req.body?.recipeId;
  try {
    const newRating = await Rating.create({
      userId: userId,
      recipeId: recipeId,
      rating: req.body.rating,
    });
    res.status(200).json({
      status: "ok",
      message: "rating successfully created",
      data: newRating
    });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: error,
    });
  }
});

//!delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRating = await Rating.findByIdAndDelete(id);
    res.status(200).json({
      status: "ok",
      message: "delete rating route is working",
      data: deletedRating,
    });
  } catch (error) {
    console.log(error);
  }
});

//!update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changedRating = req.body;
  try {
    const editedRating = await Rating.findByIdAndUpdate(id, changedRating, {
      new: true,
    });
    res.status(200).json({
      status: "ok",
      message: "update rating route is working",
      data: editedRating,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "failed to update rating",
    });
  }
});

module.exports = router;
