const express = require("express");
const router = express.Router();
const Comment = require("../models/comments.js");
const Recipe = require("../models/recipes.js");
const User = require("../models/users.js");
const Reply = require("..models/replies.js");

//!create
router.post("/", async (req, res) => {
  const userId = req.body?.userId;
  const recipeId = req.body?.recipeId;
  try {
    const newComment = await Comment.create({
      userId: userId,
      recipeId: recipeId,
      comment: req.body.comment,
    });
    res.status(200).json({
      status: "ok",
      message: "comment successfully created",
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
    const deletedComment = await Comment.findByIdAndDelete(id);
    res.status(200).json({
      status: "ok",
      message: "delete individual comment route is working",
      data: deletedComment,
    });
  } catch (error) {
    console.log(error);
  }
});

//!update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changedComment = req.body;
  try {
    const editedComment = await Comment.findByIdAndUpdate(id, changedComment, {
      new: true,
    });
    res.status(200).json({
      status: "ok",
      message: "update Comment route is working",
      data: editedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "failed to update Comment",
    });
  }
});

module.exports = router;
