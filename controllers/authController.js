const User = require("../models/userModels.js");
const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) =>{
    const {username, password} =  req.body
    try {
        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            password: hashpassword
        })
        req.session.user =  newUser
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

exports.login = async (req, res)=>{
    const {username, password} =  req.body
    try {
        const user = await User.findOne({username})
        // console.log("line 31 auth", user)
        if(!user){
            return res.status(400).json({
                status: 'fail',
                message: "user not found"
            })
        }
        const isCorrect =  await bcrypt.compare(password, user.password)
        if(isCorrect){
            req.session.user = user
            res.status(201).json({
                status: 'success',
                message: "login successful"
            })
        }else{
            res.status(400).json({
                status: 'fail',
                message: 'incorrect username or password'
            })
        }
      
    } catch (error) {
        console.log("error:", error)
        res.status(400).json({
            status: "fail",
        })
    }
}

