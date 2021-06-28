var bookService={}
var db=require("../connections/schema");
var books=require("../model/bookClass")


bookService.insertBooks=(arrayOfBooks)=>{
    return db.getBooksCollection().then((bookcollection)=>{
        return bookcollection.insertMany(arrayOfBooks).then((data)=>{
            if(data){
                return "Inserted"
            }
            else{
                throw new Error("Insertion failed")
            }
        }).catch(err=>{
            throw new Error(err.message)
        })
    }).catch(err=>{
        throw new Error(err.message)
    })
}



//get a specific book details
bookService.getBookdetails=(bookid)=>{
    return db.getBooksCollection().then((bookcollection)=>{
        return bookcollection.findOne({id:bookid},{_id:0,__v:0}).then(data=>{
            return data
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}

//get book details by name

bookService.getBookdetailsByName=(bookname)=>{
    return db.getBooksCollection().then((bookcollection)=>{
        return bookcollection.findOne({name:bookname},{_id:0,__v:0}).then(data=>{
            return data
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}

//get all books

bookService.getAllBooks=()=>{
   return  db.getBooksCollection().then(bookcollection=>{
        return  bookcollection.find({},{_id:0}).then(data=>{
            if(data){
                return data
            }
            else{
                throw new Error("Fetching failed")
            }
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}

//get book details by address
bookService.getBookdetailsByAddress=(addressid)=>{
    return db.getBooksCollection().then((bookcollection)=>{
        return bookcollection.findOne({address:addressid},{_id:0,__v:0}).then(data=>{
            return data
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}



module.exports=bookService;