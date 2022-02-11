const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    author: { type: String, unique: true, required: true },
    
});

module.exports = mongoose.model("Recipe", recipeSchema);
