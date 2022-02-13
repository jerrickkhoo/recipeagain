const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true },
    recipeId: { type: String, unique: true, required: true },
    comment:{type:String, required:true},
    repliedTo:{type:String}
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);
