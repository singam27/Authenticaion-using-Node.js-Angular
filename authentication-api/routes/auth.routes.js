const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/Users");
const authorize = require("../middlewares/auth");

//Register 
router.post("/register", (req, res, next) => {
    userSchema.findOne({ email: req.body.email }).then((user) => {

        if (user) {

            return res.status(422).json({ message: "Email Already in Use" })

        }
        //hashing the password and storing the db
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const users = new userSchema({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            users.save().then((response) => {
                res.status(201).json({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error,
                    message: error.message
                });
            });
        });
    })
})

// return all users

router.route('/').get((req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error);
        }
        else {
            res.status(200).json(response)
        }
    })
})

//login user

router.post("/login", (req, res, next) => {

    let loginUser;
    userSchema.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            return res.json({
                message: "Authentication Failed!!Please Enter Correct Email Address."
            });
        }
        loginUser = user;
        return bcrypt.compare(req.body.password, user.password)
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication Failed.Please Enter Correct Password"
            });
        }
        let jwtToken = jwt.sign({
            email: loginUser.email,
            userID: loginUser._id
        }, "learning authentication with angular", {
            expiresIn: "1h"
        });

        res.status(200).json({

            token: jwtToken,
            expiresIn: 3600,
            _id: loginUser._id
        });
    }).catch(err => {
        message: "Authentication Failed. Email and Password doesn't match"
    }).catch(err => {
        return res.json({ message: "Email Already in use" })
    })


})

// returns specififc user details
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            console.log("error", error)
            return next(error)
        }
        else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


//check whether email exists or not
router.post("/email", (req, res, next) => {

    userSchema.findOne({ email: req.body.email }).then((user) => {

        if (user) {
            return res.json({ message: true })
        }

        else {
            return res.json({ message: false })
        }

    })

})


module.exports = router;