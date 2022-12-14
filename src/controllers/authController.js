const User = require('../models/auth_model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//Register
exports.register = async(req,res) => {
    const {username, email, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User({
        username:username,
        email:email,
        password: hashedPass
    })
    await user.save()
        .then((result) => {
            let token = jwt.sign({username:username}, process.env.JWT_KEY, {
                expiresIn: "1h"
            })
            res.status(200).json({data:result, token:token});
            console.log("User registered");   
        }).catch((err) => {
            if(err.code === 11000){
                res.send("Duplicate key error")
            }
            console.log(err.message);
        });
}

//Login
exports.login = async(req,res) => {
    const {username, password} = req.body;
    User.findOne({username:username})
    .then(async(result) => {
        if(!result){
            res.status(404).send("No user found with the given usetname");
        }
        else {
                const isCorrect = await bcrypt.compare(password, result.password);
                if(isCorrect){
                    let token = jwt.sign({username:username}, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    })

                    res.status(200).send({status:'Logged In', access_token: token});
                }else {
                    res.status(400).send("Invalid username or password");
                }
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
            console.log(err);
        })
}
