const express = require('express');
const connectDB = require('./db/Connection');
const app = express();
const cors = require('cors')//added cors

const airlineController = require('./api/airlineAPI');
const authenticationController = require('./api/authAPI');
 const UserController = require('./api/userAPI');

connectDB();
app.use(express.json({ extended: false }));
//this is to allow the cross orgin requests
app.use(cors({origin:'http://localhost:3000'}))  //replace with your react client port 'http://localhost:3000'
const Port = process.env.Port || 3008;
 
app.listen(Port, () => console.log('Server started'));
app.use('/airline', airlineController);
app.use('/auth', authenticationController);
app.use('/User', UserController);