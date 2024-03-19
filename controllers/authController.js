const User = require("../models/userModels");

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
        res.status(400).json({
            status: "fail",
        })
    }
}