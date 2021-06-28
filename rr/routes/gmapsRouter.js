var express = require('express');
var router = express.Router();
var addressService=require('../services/addressService')
var bookService=require('../services/booksService')

router.get('/all', (req, res,next) => {
    let userObjArray=[]
    addressService.showAllAddresses().then(data=>{
        for(let address of data){
            let bookArray=[]
          bookService.getBookdetailsByAddress(address.addressid).then(bookData=>{
            bookArray.push(bookData.name)
              let userObj={
                "userDetails": {
                    "contactDetails": address.userDetails.contactDetails,
                    "name": address.userDetails.name
                  },
                  "address": address.address,
                  "books":bookArray,
                  "addressid":address.addressid
              }
              userObjArray.push(userObj)
              if(data.indexOf(address)+1==data.length){
                  res.send(userObjArray);
              }
          })
        }
    }).catch(err=>{
        next(err)
    })
});


module.exports=router