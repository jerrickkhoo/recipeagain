const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
     type: String, 
     required: true,
     minLength: 3
  },
  email: {
    type: String , 
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //https://emailregex.com/
  },
  password: {
    type: String, 
    required: true ,
    minLength: 6
    //TODO: add password validation
  },
  favorites:{
    type:[{ type: String }], //TODO: refer to recipeID in recipe model
  }
}, {timeStamp: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
