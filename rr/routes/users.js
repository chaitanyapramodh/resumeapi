var express = require('express');
var router = express.Router();
var userService=require('../services/userService')
var idGen=require('../utilities/idGenerator')
var multer=require("multer");
/* GET users listing. */
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});
const upload =multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4
  },
  fileFilter: fileFilter
});

//get all users
router.get('/allusers', function(req, res, next) {
  userService.getAllUsers().then(data=>{
    if(data.length>0){
      res.status(200).json(data);
    }
    else{
      res.status(400).json({
        message:"No users found"
      });
    }
  }).catch(err=>{
    next(err)
  })
});

//signinup a new user
router.post('/signup',function(req,res,next){
  var userData={
    userid:idGen("U"),
    name:req.body.name,
    userName:req.body.userName,
    password:req.body.password,
    email:req.body.email,
    imgPath:"",
    mobNumber:req.body.mobNumber?req.body.mobNumber:null,
    address:null
  }
  userService.createNewUser(userData).then(data=>{
    if(data){
      res.status(200).json({
        status:200,
        message:"New user created succesfully"
      })
    }
    else{
      res.status(500).json({
        message:"Something went wrong"
      });
    }
  }).catch(err=>{
    next(err)
  })
})


//find unique user name
router.get('/checkusername/:username', (req, res,next) => {
  var username=req.params.username
  var userNameArray=[]
  userService.getAllUserNames().then(users=>{
    users.forEach(user=>{
      userNameArray.push(user.userName)
    })
    if(userNameArray.includes(username)){
      res.status(502).json({
        status:400,
        message:"user name not  available"
      });
    }
    else{
      res.status(200).json({
        status:200,
        message:"user name available"
      });
    }

  })
});


//sign in

router.get('/userDetails/:userid', (req, res,next) => {
  userService.findUserByUserid(req.params.userid).then(data=>{
    res.send(data)
  }).catch(err=>{
    next(err)
  }
    )
});

//modifyuser
router.patch('/changeProfileSettings',(req,res,next)=>{
  userService.changeProfileSettings(req.body.userid,req.body.name,req.body.email,req.body.mobNumber,req.body.password).then(data=>{
    if(data){
      res.status(200).json({
        status:200
      });
    }
    else{
      let err=new Error("Couldn't change settings")
      next(err)
    }
  }).catch(err=>{
    next(err)
  })
})

//sign in user
router.put('/signin',(req,res,next)=>{
  var username=req.body.userName
    userService.findUser(username).then(data=>{
      if(data.password==req.body.password){
        res.status(200).json({
          userId:data.userid,
          status:200,
          message:"sign in successfull"
        });
      }
      else{
        res.status(500).json({
          status:404,
          message:"wrong credentials"
        });
      }
    }).catch(err=>{
      next(err)
    })
})
//change cover
router.post('/changeCover',upload.single("cover"),(req, res,next) => {
  userService.changeProfile(req.body.userid,req.file.path).then(data=>{
    res.status(200).json({
      status:200
    });
  }).catch(err=>{
    next(err)
  })
});


//sign out a user

router.get('/signout',(req,res,next)=>{
  res.clearCookie("session_id")
  res.status(200).json({
    message:"signed out successfully"
  });
})

// invalid route

router.use('**',(req,res)=>{
  res.status(404).json({
    message:"Invalid page mowa"
  });
})
module.exports = router;
