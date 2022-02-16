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
  },
  password: {
    type: String, 
    required: true ,
    minLength: 6
  },
  favorites:{
    type:[mongoose.Schema.Types.ObjectId], ref:'Recipe'
   }, 
  posts:{
    type: [mongoose.Schema.Types.ObjectId],
    ref:'Recipe'
  }
}, {timeStamp: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
