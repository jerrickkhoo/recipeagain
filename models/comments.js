const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    recipeId: { type: String, required: true },
    comment:{type:String, required:true},
    repliedTo:{type:String}
    
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);
