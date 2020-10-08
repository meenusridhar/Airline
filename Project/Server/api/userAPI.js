const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../db/userModel');
const router = express.Router();

//To sign up the user
router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var user = new UserModel();
    let email = req.body.d.find((x) => x.name == "email").val;
    user.FirstName = req.body.d.find((x) => x.name == "FirstName").val;
    user.LastName = req.body.d.find((x) => x.name == "LastName").val;
    user.email = req.body.d.find((x) => x.name == "email").val;
    user.password = req.body.d.find((x) => x.name == "password").val;
    user.role = "manager";
    UserModel.findOne({ email }).then(userdata => {
        if (userdata) {
            console.log('record exists');
            return res.json({ Message: "User already exists", MsgType: "error", MsgTime: 8000 });
        }
        else {
            user.save((err, doc) => {
                if (!err) {
                    console.log('record inserted');
                    return res.json({ Message: "Registered Successfully", MsgType: "success", MsgTime: 5000 });
                }
                else {
                    return res.json({ Message: "Failed!", MsgType: "error", MsgTime: 5000 });
                }
            });
        }
    });

}
router.get('/', (req, res) => {
    UserModel.findById(req.body._id, (err, data) => {
        if (!err) {
            return data;
        }
    });
});


module.exports = router;