const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../db/userModel');
const AirlineModel = require('../db/airlineModel');
const router = express.Router();

//Import JSON WEB TOKENS Libraries
var jwt = require("jsonwebtoken");

const accessTokenSecret = 'sectoken###';
const refreshTokenSecret = 'sectokentorefresh';

router.get("/login", (req, res) => {
    // read username and password from request body
    const { username, password } = req.body;
    // filter user from the users array by username and password
    UserModel.findOne({ email: req.query["email"] }).then(user => {
        console.log(user);
        if (user) {
            const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
            const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);
            res.json({ accessToken:accessToken, refreshToken:refreshToken, userData:user , MsgType:"success"});
        } else {
           res.json({userData:"User doesn't exists - Pease signup to register", MsgType:"error"})
        }
    });

});
module.exports = router;