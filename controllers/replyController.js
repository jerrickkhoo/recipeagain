const express = require("express");
const router = express.Router();
const Reply = require("../models/replies.js");

//!create
router.post("/new/:commentId", async (req, res) => {
  const userId = req.body?.userId;
  const {commentId} = req.params;
  console.log(commentId);
  try {
    const newReply = await Reply.create({
      userId: userId,
      parent: commentId,
      comment: req.body.comment,
    });
    const populatedReply = await Reply.findById(newReply._id).populate("userId","username")
    res.status(200).json({
      status: "ok",
      message: "Reply successfully created",
      data:populatedReply
    });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: error,
    });
  }
});

//!delete

router.put("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const editedReply = await Reply.findByIdAndUpdate(id, {comment:req.body.comment, deleted:true}, {
      new: true,
    }).populate("userId","username");
    res.status(200).json({
      status: "ok",
      message: "delete Reply route is working",
      data: editedReply,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "failed to update Reply",
    });
  }
});

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedReply = await Reply.findByIdAndUpdate(id,{comment:"deleted comment"});
//     res.status(200).json({
//       status: "ok",
//       message: "delete individual Reply route is working",
//       data: deletedReply,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//!update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const editedReply = await Reply.findByIdAndUpdate(id, {comment:req.body.comment, edited:true}, {
      new: true,
    }).populate("userId","username");
    res.status(200).json({
      status: "ok",
      message: "update Reply route is working",
      data: editedReply,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "failed to update Reply",
    });
  }
});

//!getAll
router.get("/:commentId", async (req, res) => {
    const {commentId} = req.params;
    try {
      const foundReply = await Reply.find({
        parent:commentId,
      }).populate("userId","username");
      // console.log(foundReply);
      let message = "Reply found"
      if(!foundReply){
        message ="find operation has no errors but no Reply found"
      }
      res.status(200).json({
        status: "ok",
        message: message,
        data: foundReply,
      });
    } catch (error) {
      res.status(400).json({
        status: "not ok",
        message: "Reply not found",
        error: error,
      });
    }
  });
module.exports = router;
