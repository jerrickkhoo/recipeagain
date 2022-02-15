const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    comment:{type:String, required:true},
    replies:[{
        type: mongoose.Schema.Types.ObjectId,ref:'Reply'
    }]
    
}, {timestamps: true});

module.exports = mongoose.model("Reply", replySchema);
