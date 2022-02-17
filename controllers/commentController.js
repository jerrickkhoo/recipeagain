const express = require("express");
const router = express.Router();
const Comment = require("../models/comments.js");

//MIDDLEWARE
const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    //res.redirect("/login")
    res.status(401).json({ status: "not ok", message: "please login to be able to post a comment"});
  }
}

//!create
router.post("/new",isLoggedIn, async (req, res) => {
  const userId = req.body?.userId;
  const recipeId = req.body?.recipeId;
  try {
    const newComment = await Comment.create({
      userId: userId,
      recipeId: recipeId,
      comment: req.body.comment,
    });
    const populatedComment = await Comment.findById(newComment._id).populate("userId","username")
    res.status(200).json({
      status: "ok",
      message: "comment successfully created",
      data:populatedComment
    });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: error,
    });
  }
});

//!delete
router.put("/delete/:id",isLoggedIn, async (req, res) => {
  const { id } = req.params;
  try {
    const editedComment = await Comment.findByIdAndUpdate(id, {comment:req.body.comment, deleted:true}, {
      new: true,
    }).populate("userId","username");
    res.status(200).json({
      status: "ok",
      message: "delete Comment route is working",
      data: editedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "failed to delete Comment",
    });
  }
});
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedComment = await Comment.findByIdAndDelete(id);
//     res.status(200).json({
//       status: "ok",
//       message: "delete individual comment route is working",
//       data: deletedComment,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//!update
router.put("/:id",isLoggedIn, async (req, res) => {
  const { id } = req.params;
  try {
    const editedComment = await Comment.findByIdAndUpdate(id, {comment:req.body.comment, edited:true}, {
      new: true,
    }).populate("userId","username");
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

//!get
router.get("/:recipeId", async (req, res) => {
  const {recipeId} = req.params;
  try {
    const foundComment = await Comment.find({
      recipeId: recipeId,
    }).populate("userId","username")
    console.log(foundComment);
    let message = "comments retrieved";
    if (!foundComment) {
      message = "no comments";
    }

    res.status(200).json({
      status: "ok",
      message: message,
      data: foundComment,
    });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: "error when finding comments",
      error: error,
    });
  }
});

module.exports = router;
