const express = require('express');
const mongoose = require('mongoose');
const AirlineModel = require('../db/airlineModel');
const router = express.Router();
var jwt = require("jsonwebtoken");


router.post('/insert',(req, res) => {
   var airline = new AirlineModel();
    airline.FlightNo = req.body.d.FlightNo;
    airline.FlightName = req.body.d.FlightName;
    airline.FlightSource = req.body.d.FlightSource;
    airline.FlightDestination = req.body.d.FlightDestination;
    airline.FlightFare = req.body.d.FlightFare;
   console.log(airline);
    airline.save((err, doc) => {
        if (!err) {
            AirlineModel.find((err, docs) => {
                if (!err) {
                    res.json({FlightDet:docs, Message:"Flight Added Successfully", MsgType:"success" ,MsgTime:3000 });
                }
                else {
                    res.json({Message:"Flight Added Failed :" + err, MsgType:"error" ,MsgTime:3000 });
                }
            });
        }
        else {
            res.json({Message:"Flight Added Failed :" + err, MsgType:"error" ,MsgTime:3000 });
        }
    });

});
// to insert the flight record
function insertRecord(req, res) {
   // console.log("success");
    var airline = new AirlineModel();
    console.log(req.body);
    airline.FlightNo = req.body.FlightNo;
    airline.FlightName = req.body.FlightName;
    airline.FlightSource = req.body.FlightSource;
    airline.FlightDestination = req.body.FlightDestination;
    airline.FlightFare = req.body.FlightFare;
    airline.save((err, doc) => {
        if (!err) {
            console.log("insertRecord");
        }
        else {
            if (err.name == 'ValidationError') {
            }
            else
             console.log('Error during record insertion : ' + err);
        }
    });
}
//To update the flight record
function updateRecord(req, res) {
    AirlineModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            console.log("updateRecord");
        }
        else {
          
        }
    });
}
//To delete the flight
router.delete('/delete', (req, res) => {
    console.log(req);
    console.log(req.query["id"]);
    var id=req.query["id"];
    console.log(id);
    AirlineModel.findByIdAndRemove(id, (err, doc) => {
        if (!err) {
            AirlineModel.find((err, docs) => {
                if (!err) {
                    res.json({FlightDet:docs, Message:"Flight Deleted Successfully", MsgType:"success" ,MsgTime:3000 });
                }
                else {
                    res.json({Message:err, MsgType:"error" ,MsgTime:3000 });
                }
            });
        }
        else {
            res.json({Message:"Delete failed", MsgType:"error" ,MsgTime:3000 });
        }
    });
});

//To get the flight by ID
router.get('/', (req, res) => {
    AirlineModel.findById(req.body._id, (err, doc) => {
        if (!err) {
            // alert("not error");
            console.log(doc);
        }
    });
});

//Api to list the flight details
router.get('/list', (req, res) => {
   
    console.log("headers:"+req.headers);
    console.log("headers:"+req.headers.accesstoken);
    // verify a token symmetric
    jwt.verify(req.headers.accesstoken, 'sectoken###', function(err, decoded) {
    console.log("verifgy"+ JSON.stringify(decoded)) // bar
    if(!err){
        AirlineModel.find((err, docs) => {
            if (!err) {
              //  console.log(docs);
                res.json({FlightDet:docs, role:decoded});
                //list: docs
                
            }
            else {
                res.json({Message:"Server down", MsgType:"error" ,MsgTime:3000 });
            }
        });
    }
    else{
        res.json({Message:"Not Authorized", MsgType:"error" ,MsgTime:3000 });

    }


});

  
});

module.exports = router;