var express = require('express');
var router = express.Router();
var userRouter=require('./users')
var donateRouter=require('./donate')
var mailRouter=require('./sendData')
var searchRouter=require('./searchBook')
var setupService=require('../services/setupService')
var gmapsRouter=require('./gmapsRouter')

router.use('/user',userRouter)
router.use('/donate',donateRouter)
router.use('/searchBook',searchRouter)
router.use('/sendMail',mailRouter)
router.use('/searchNear',gmapsRouter)

router.get('/', function(req, res, next) {
  res.send("kira");
});
/* GET home page. */
router.get('/setupDb', function(req, res, next) {
  setupService.setupUserCollections().then(data=>{
    if(data){
      setupService.setupAddressCollection().then(data=>{
        if(data){
          setupService.setupBooksCollections().then(data=>{
            if(data){
              res.status(200).json({
                message:"setup successfull"
              });
            }
            else{
              res.status(400).json({
                message:"Books collection setup not successfull"
              });
            }
          }).catch(err=>{
            next(err)
          })
        }
        else{
          res.status(400).json({
            message:"Address collection setup not successfull"
          });
        }
      }).catch(err=>{
        next(err)
      })
    }
    else{
      res.status(400).json({
        message:"User collection setup not successfull"
      });
    }

  }).catch(err=>{
    next(err)
  })
});



router.use('**',(req,res)=>{
  res.status(404).json({
    message:"Invalid page mowa"
  });
})

module.exports = router;
