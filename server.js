'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const port = process.env.Port;
const app = express();
app.use(cors());

const userCollection = require('./mymodle/usermodel');
const getbooksHandler = require('./mymodle/usermodel');



app.get('/',homeHandler);
app.get('/books', getbooksHandler);

function homeHandler(req,res){
    res.send('Home Route');
}


    app.listen(port, () => {
        console.log(`listen on ${port}`);
    })
