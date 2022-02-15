const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    recipeId: { type: String, required: true },
    comment:{type:String, required:true},
    replies:[{
        type: mongoose.Schema.Types.ObjectId,ref:'Reply'
    }]
    
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);
