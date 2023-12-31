require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
require('./db/conn');
const cors = require('cors');
const users = require("./models/schema");
const developers = require("./models/devschema");
const newapp = require('./models/apps');
const registerdata =require('./models/register');
const router = require("./routes/router");
const multer = require("multer");
const sharp = require('sharp');

app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));



app.listen(port,(req,res)=>{
    console.log(`server is start port number ${port}`);
})