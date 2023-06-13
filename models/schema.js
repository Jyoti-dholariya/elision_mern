const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accounts:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true,
    },
    developer:{
        type:String,
        require:true,
    }
})

const users = new mongoose.model("users",userSchema);

module.exports = users;
