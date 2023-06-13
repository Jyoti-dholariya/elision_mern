const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>console.log("data base connected")).catch((error)=>console.log("error"+error.message));

// mongoose.connect("mongodb://127.0.0.1:27017/elision").then(()=>console.log("connection start")).catch((e)=>console.log(e));