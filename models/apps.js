const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    accounts:{
        type:String,
        require:true,
    },
    name:{
      type:String,
      require:true,
    },
    developer:{
        type:String,
        require:true,
    },
    pack:{
        type:String,
        require:true,
    },
    imgpath:{
        // data:Buffer,
        type:String,
        required:true,
    },
    status:{
        type:String,
        require:true,
    },
    json:{
        type:String,
        require:true,
    }
})

const newapp = new mongoose.model("newapp",appSchema);

module.exports = newapp;