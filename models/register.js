const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');


const registerSchema = new mongoose.Schema({
    email:{
    type:String,
    require:true,
},
password:{
  type:String,
    require:true,
}
})

// registerSchema.pre("save",async function(next){
//   if(this.isModified("password")){
//       this.password = await bcrypt.hash(this.password,12);
//   }

//   next();

// })

const registerdata = new mongoose.model("registerdata",registerSchema);

module.exports = registerdata;
