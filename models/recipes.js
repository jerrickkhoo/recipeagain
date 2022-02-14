const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    author: {
        type: String //this will be userID gotten from res.session.currentUser
        //type: mongoose.Schema.Types.ObjectId,
        //ref: "User"
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
    // comments: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     //ref: 'Comment' //TODO: refer to comment schema and filter for commentID that corresponds to recipeID
    // },
    tags: [String],
    rating: {
        type: Number,
        default: 0
    }
}, {timeStamp: true});

module.exports = mongoose.model("Recipe", recipeSchema);
