const express = require('express');
const userSchema = require('../schemas/userSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// initialize a router
const router = express.Router();


// / Todo Model
const User = new mongoose.model('User', userSchema);


// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({
            message: 'User Created Successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            error: 'There was a server side error! User created unsuccessfull',
        })
    }
})

// SIGN-IN
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });

        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)
            console.log(process.env.JWT_TOKEN)
            if(isValidPassword) {
                // Generate token
                const token = jwt.sign(
                {
                    username: user[0].username,
                    userId: user[0]._id,
                }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                })

                console.log(token)

                res.status(200).json({
                    access_token: token,
                    message: 'Login successfully'
                })
            }
            else {
                res.status(401).json({
                    error: 'Authentication Failed',
                })  
            }
        }
        else {
            res.status(401).json({
                error: 'Authentication Failed!',
            }) 
        }
    }
    catch (err) {
        res.status(500).json({
            error: 'Authentication failed',
        })
    }
})


module.exports = router;