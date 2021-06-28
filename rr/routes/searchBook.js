var express = require('express');
var router = express.Router();
var userService=require('../services/userService')
var bookService=require('../services/booksService')
var addressService=require('../services/addressService')

router.get('/', (req, res,next) => {
    var foundBookids=[]
    var addressIDs=[]
    var foundBooks=[]
    var searchInput=req.query.searchInput?String(req.query.searchInput):null
    var type=req.query.type
    var isbn=req.query.isbn?req.query.isbn:null
    var bookname=req.query.bookName?req.query.bookName:null
    var author=req.query.author?req.queru.author:null
    var bookId=null
    if(type=="d"){
        donorSearch()
    }
    else if(type=="b"){
        bookSearch()
    }
    function donorSearch(){
        bookService.getAllBooks().then(booksData=>{
            for(let book of  booksData ){
               if(isbn!=null){
                if(book.isbn==isbn){
                    if(! foundBookids.includes(bookId)){
                        if(!addressIDs.includes(book.address)){
                            addressIDs.push(book.address)
                        }
                    }
                }
               }
                if(bookname!=null){
                    if(book.name.trim().toLowerCase()==bookname.trim().toLowerCase()){
                        if(! foundBookids.includes(bookId)){
                            if(!addressIDs.includes(book.address)){
                                addressIDs.push(book.address)
                            }
                        }
                        
                }
               }
            }
            if(addressIDs.length>0){
                var users=[]
                for(let addressid of addressIDs){
                    addressService.getAddress(addressid).then(data=>{
                        users.push(data)
                        if(addressIDs.length==addressIDs.indexOf(addressid)+1){
                            res.send(users);
                        }
                    }).catch(err=>{
                        next(err)
                    })
    
                }
            }
            else{
                res.status(404).json({status:404});
            }
    
        })
    }
    function bookSearch(){
        bookService.getAllBooks().then(booksData=>{
            for(let book of  booksData ){
                if(searchInput!=null){
                    var si=searchInput.trim().toLowerCase()
                    var bookName=book.name.trim().toLowerCase()
                    var author=book.author.trim().toLowerCase()
                    if(si==bookName || si==author|| si==String(book.isbn)){
                        foundBooks.push(book)
                    }
                }
                if(booksData.indexOf(book)+1==booksData.length){
                    res.send(foundBooks);
                }

            }
        }).catch(err=>{
            next(err)
        })
    }


});

router.get('/allBooks',(req,res,next)=>{
    var foundBooks=[]
    bookService.getAllBooks().then(booksData=>{
        for(let book of booksData){
            addressService.getAddress(book.address).then(userData=>{
                var bookObj={
                    id:book.bookid,
                    bookName:book.name,
                    author:book.author,
                    isbn:book.isbn?book.isbn:null,
                    donorDetails:userData.userDetails,
                    donorAddress:userData.address
                }
                foundBooks.push(bookObj)
                if(booksData.indexOf(book)+1==booksData.length){
                    res.send(foundBooks);
                }
            }).catch(err=>{
                next(err)
            })
        }
    }).catch(err=>{
        next(err)
    })
})



module.exports=router