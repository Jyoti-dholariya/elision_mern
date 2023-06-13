const express = require('express');
const router = new express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs'); 
const users = require('../models/schema');
const developers = require('../models/devschema');
const newapp = require('../models/apps');
const registerdata = require('../models/register');
const sharp = require('sharp')

 // sigin form data
router.post('/register',async(req,res)=>{
  const{email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({error:"Plz enter the field properly"});
  }
  
  try{
    const userExist = await registerdata.findOne({password:password});
    if(!userExist){
      return res.status(400).json({message:"user error"});
    }else{
      return res.status(200).json({message:"user registerd successfully"});
    }
    // const user = new registerdata({email,password});
    //   await user.save(); 
    // res.status(200).json({message:"user registerd successfully"})
  }catch(e){
    res.status(400).json("invalid");
    console.log(e);
  }
})


//users data add
router.post('/users/add',async(req,res)=>{
    const{accounts,status,developer} = req.body;

if(!accounts || !status || !developer){
  res.status(404).json({error:"fill the all data"})
}

 try{
        const adduser = new users({accounts,status,developer})
        await adduser.save();
       if(adduser){
        res.status(201).json(adduser);
       }
        console.log(adduser);
 }catch(error){
  console.log(error);
    // res.status(400).json(error);
}})


//developer data add
router.post('/adddev',async(req,res)=>{
  const{developer} =req.body;
  try{
 const adddeveloper = new developers({developer})
 await adddeveloper.save();
 if(adddeveloper){
  res.status(200).json(adddeveloper);
 }
 console.log(adddeveloper);
  }catch(e){
    res.status(400).json(e);
  }
})



// post app data//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     return cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({storage});

router.post('/newapp',upload.single('photo'),async(req,res)=>{
   const {filename} = req.file;
  const {accounts,name,developer,pack,status,json} = req.body;

  // if(!name || !accounts || !developer || !pack || !status  || !json){
  //   return res.status(200).json({error:"plz filed the field"})
  // }

  try{
      const userdata = new newapp({
        accounts,
          name,
          developer,
          pack,
          status,
          imgpath: filename,
          json
      })
      const finaldata = await userdata.save();
      res.status(201).json({status:201,finaldata});
  }catch(error){
      res.status(401).json({status:401,error})
  }
});


// update app data
router.patch("/account/edit/:id",upload.single('photo'),async(req,res)=>{
  try{
    const {id} = req.params;
    const {accounts,name,developer,pack,status,json} = req.body;
    // const {imgpath} = req.file;
    const updateappdata = await newapp.findByIdAndUpdate(id,req.body,{
      new:true,
      accounts,
      name,
      developer,
      pack,
      status,
      // imgpath: req.file.filename,
      json,
    });
    console.log(updateappdata);
    res.status(200).json(updateappdata);
  }catch(e){
    console.log(e);
    res.status(400).json(e);
  }
})


// ----------------------------------------------get---------------------------------------//

// get email & password data //
router.get("/register",async(req,res)=>{
  try{
 const devdata = await registerdata.find();
 res.status(200).json(devdata);
  }catch(error){
    res.status(400).json(error);
  }
})


// get account data
router.get("/account",async(req,res)=>{
    try{
      const userdata = await users.find();
      res.status(201).json(userdata);
      //  console.log(userdata);
    }catch(e){
     res.status(404).json(e);
    }
})


//get developerdata
router.get("/developer",async(req,res)=>{
  try{
 const devdata = await developers.find();
 res.status(200).json(devdata);
  }catch(error){
    res.status(400).json(error);
  }
})


// get new app all data for testing
router.get("/appdata",async(req,res)=>{
  try{
 const devdata = await newapp.find();
 res.status(200).json(devdata);
  }catch(error){
    res.status(400).json(error);
  }
})

// get new app data
router.get("/appdata/:accounts",async(req,res)=>{
  let data = await newapp.find(
    {
      "$or":[
        {"accounts":{$regex:req.params.accounts}}
      ]
    }
  )
 console.log(data);
 res.send(data)
})

// --------------------individual get------------------------------//

//get individual account data
router.get("/getuser/:id",async(req,res)=>{
  try{
  const {id} = req.params;
const userindivitual = await users.findById({_id:id});
res.status(201).json(userindivitual);
  }catch(error){
    res.status(404).jason(error);
  }
})


// get individual developer data
router.get("/getuserdev/:id",async(req,res)=>{
  try{
  const {id} = req.params;
const userindivitual = await developers.findById({_id:id});
res.status(200).json(userindivitual);
  }catch(error){
    res.status(400).json(error);
  }
})


// get indivitual account app edit
router.get("/account/app/:id",async(req,res)=>{
  try{
    const{id} = req.params;
    const appedit = await newapp.findById({_id:id});
    res.status(200).json(appedit);
  }catch(e){
    res.status(400).json(e);
  }
})


// chnage password data
router.get("/register/:id",async(req,res)=>{
 try{
   const {id}= req.params;
   const editpass = await registerdata.findById({_id:id});
   res.status(200).json(editpass)
  }catch(e){
    res.status(400).json(e);
  }
})


// get indivitual app data
// router.get("/appdata/:key",async(req,res)=>{
//   console.log(req.params.key);
//   let data = await newapp.find(
//     {
//       "$or":[
//                  {"accounts":{$regex:req.params.key}}
//                ]
//     }
//   )
//  console.log(data);
//  res.json(data)
// })







// ---------------------------------------------update---------------------------------------//
//update user data
router.patch("/updtaeuser/:id",async(req,res)=>{
  try{
const {id} = req.params;
const updateuser = await users.findByIdAndUpdate(id,req.body,{
  new:true
});
res.status(201).json(updateuser);
  }catch(error){
   res.status(404).json(error);
  }
})


// update developer data
router.patch("/updatedev/:id",async(req,res)=>{
  try{
 const {id} = req.params;
 const updatedev = await developers.findByIdAndUpdate(id,req.body,{
  new:true
 });
 res.status(200).json(updatedev);
  }catch(error){
    res.status(400).json(error);
  }
})

//-----update change password-------//
router.patch("/register/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const updatepass = await registerdata.findByIdAndUpdate(id,req.body,{
      new:true
    });
    // console.log(updatepass);
    res.status(200).json(updatepass);
  }catch(e){
    res.status(400).json(e);
  }
})




// --------------------------------------------------delete----------------------------------//
// delete userdata
router.delete("/deleteuser/:id",async(req,res)=>{
  try{
const{id} = req.params;
const deleteuser = await users.findByIdAndDelete({_id:id})
// console.log(deleteuser);
res.status(201).json(deleteuser);
  }catch(error){
    res.status(404).json(error);
  }
})

// delete developer data
router.delete("/deletedev/:id",async(req,res)=>{
  try{
const {id} = req.params;
const deletedev = await developers.findByIdAndDelete({_id:id})
// console.log(deletedev);
res.status(200).json(deletedev);
  }catch(error){
    res.status(400).json(error);
  }
})


// delete app data
router.delete("/account/app/delete/:id",async(req,res)=>{
  try{
    const{id}=req.params;
    const deleteapp = await newapp.findByIdAndDelete({_id:id})
    // console.log(deleteapp);
    res.status(200).json(deleteapp);
  }catch(e){
    res.status(400).json(e);
  }
})




module.exports = router;