var express = require('express');
var mailService=require('../services/mailservice');
const userService = require('../services/userService');
var router = express.Router();


router.post('/review', (req, res,next) => {
   
userService.findUserByUserid(req.body.userid).then(data=>{
       var udata={
           name:data.name,
           email:data.email,
           contactNo:data.mobNumber,
           wentwell:req.body.wentwell,
           couldBeBetter:req.body.couldBeBetter,
           rating:req.body.rating
       }
       mailService.sendMail(udata,1).then(data=>{
        res.status(200).json({
            status:200
        });
    }).catch(err=>{
        next(err)
    })
    }).catch(err=>{
        next(err)
    })

});

router.post('/contact',(req,res,next)=>{
    let data={
        name:req.body.name,
        email:req.body.email,
        contactNo:req.body.contactNo?req.body.contactNo:null,
        message:req.body.message
    }
    mailService.sendMail(data,2).then(data=>{
        res.status(200).json({
            status:200
        });
    }).catch(err=>{
        next(err)
    })
})

module.exports = router;