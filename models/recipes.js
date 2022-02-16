const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref:'User',
        required:true
    }
    ,
    description: {
        type: String, 
        required: true,
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
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,ref:'Comment'
    // }],
    tags: [String],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId, ref:'Rating'
    }]
}, { timestamps: true })

module.exports = mongoose.model("Recipe", recipeSchema);
