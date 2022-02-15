const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true,
    },
    author: {
        type: String
    }
    ,
    description: {
        type: String, 
        required: true,
    },
    ingredients:[{
        quantity: {type: Number},
        units: {type:String},
        name:{type:String, required:true},
        type:{type:String}
    }],
    steps:[String],
    image:{
        type: String
    },
    servings: {
        type: Number
    },
    duration:{
        type: Number
    },
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,ref:'Comment'
    // }],
    tags: [String],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,ref:'Rating'
    }]
}, {timeStamp: true});

module.exports = mongoose.model("Recipe", recipeSchema);
