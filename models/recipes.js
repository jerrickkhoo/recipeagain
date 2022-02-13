const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        unique: true, 
        required: true 
    },
    author: { 
        type: String, 
        unique: true, 
        required: true 
    }, //TODO:refer to userschema
    description: {
        type: String, 
    },
    ingredients:{
        quantity: {type: Number},
        units: {type:String},
        name:{type:String},
        type:{type:String}
    },
    Steps:[String],
    image:{
        type: String
    },
    Servings: {
        type: Number
    },
    Duration:{
        type: Number
    },
    tags: [String]
}, {timeStamp: true});

module.exports = mongoose.model("Recipe", recipeSchema);
