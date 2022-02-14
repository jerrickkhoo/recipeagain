const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        unique: true, 
        required: true 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    description: {
        type: String, 
    },
    ingredients:[{
        quantity: {type: Number},
        units: {type:String},
        name:{type:String},
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
    // comments: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     //ref: 'Comment' //TODO: refer to comment schema
    // },
    tags: [String]
}, {timeStamp: true});

module.exports = mongoose.model("Recipe", recipeSchema);
