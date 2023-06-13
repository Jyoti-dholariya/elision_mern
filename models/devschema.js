const mongoose = require('mongoose');

const devSchema = new mongoose.Schema({
    developer:{
        type:String,
        require:true,
    }
})

const developers = new mongoose.model("developers",devSchema);

module.exports = developers;
