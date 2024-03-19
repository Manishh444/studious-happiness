const User = require("../models/userModels.js");

console.log("hello user")
exports.signUp = async (req, res) =>{
    try {
        const newUser = await User.create(req.body)
        res.status(201).json({
            status: 'success',
            data:{
                user: newUser
            }
        })
    } catch (error) {
        console.log("error:", error)
        res.status(400).json({
            status: "fail",
        })
    }
}