const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    author: { type: String, unique: true, required: true },

}, {timeStamp: true});

module.exports = mongoose.model("Recipe", recipeSchema);
