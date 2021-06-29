var express = require('express');
var router = express.Router();
var userService=require('../services/userService')
var bookService=require('../services/booksService')
var addressService=require('../services/addressService')
var Address=require('../model/address')
var Book=require('../model/bookClass')
var idGen=require('../utilities/idGenerator')

//add donation

router.post('/addbook', (req, res,next) => {
    if(req.body.address.geometry)
        var userid=req.body.userid
        var email=req.body.email;
        var name=req.body.name;
        var mobNumber=req.body.mobNumber?req.body.mobNumber:null
        var bookid=idGen("B")
        var addressid=idGen("A")
        var bookObj= new Book(bookid,req.body.bookName,req.body.author,req.body.isbn,addressid)
        var addressObj={
            addressid:addressid,
            userDetails:{
                name:name,
                contactDetails:{
                    email:email,
                    mobNumber:mobNumber?mobNumber:null
                }
            },
            address:req.body.address
        }
        // var addressObj= new Address(addressid,req.body.address.formattedAdress,req.body.address.geometry)
        userService.addBookForDonation(userid,bookid).then(data=>{
            userService.addAddress(userid,addressid).then(data=>{
                bookService.insertBooks([bookObj]).then(data=>{
                    addressService.addAddress([addressObj]).then(data=>{
                        res.status(200).json({
                            status:200,
                            message:"Donation successfull"
                        });
                    }).catch(err=>{
                        next(err)
                    })
                }).catch(err=>{
                    next(err)
                })
            }).catch(err=>{
                next(err)
            })
        }).catch(err=>{
            next(err)
        })




});



module.exports = router;