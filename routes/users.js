var express = require('express');
var router = express.Router();
var service=require('../services/mailservice')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  
});

router.post('/visiter', (req, res) => {
  var data={
    name:req.body.name,
    contactNo:req.body.contactNo,
    email:req.body.email,
    message:req.body.message
  }
  service.sendMail(data).then((data)=>{
    if(data){
      res.status(200).json({
        "message":"mailed successfully"
      })
    }
  })


});

module.exports = router;
