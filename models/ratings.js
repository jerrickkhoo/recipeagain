const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true },
    recipeId: { type: String, unique: true, required: true },
    rating:{type:Number, required:true},
}, {timestamps: true});

module.exports = mongoose.model("Rating", ratingSchema);

