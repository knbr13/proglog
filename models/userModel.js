const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });
module.exports = mongoose.model("User", userSchema);
