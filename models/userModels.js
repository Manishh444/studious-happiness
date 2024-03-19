const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'user must have a username'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'user must have a password'],
        // unique: true,
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;