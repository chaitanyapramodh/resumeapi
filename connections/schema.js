var mongo=require("mongoose");
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/bookBufferDb";
var url="mongodb+srv://kira:kira@2424@bookbuffet.huqht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var schema=mongo.Schema
mongo.connect(url, { useNewUrlParser: true , useUnifiedTopology: true })
    .catch((error) => {
        let err = new Error("Could not connect to Database")
        err.status = 500;
        throw err;
    })

var userSchema=new schema({
    userid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
            type:String,
            required:true
    },
    mobNumber:{
            type:Number,
            required:false
        },
    address:{
        type:String,
        required:false
        },
    booksRequested:{
        type:Array,
        required:false
    },
    booksDonation:{
        type:Array,
        required:false
    },
    imgPath:{
        type:String,
        required:false
    }
},{collection:"user"})

booksSchema=new schema({
    bookid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:false
    },
    bookCover:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    }
},{collection:"books"})


var addressSchema= new schema({
    addressid:{
        type:String
    },
    userDetails:{
        name:{
            type:String,
            required:true
        },
        contactDetails:{
            email:{
                type:String,
                required:true
            },
            mobNumber:{
                type:Number,
                require:false
            }
        }
    },
    address:{
        formattedAdress:{
            type:String,
            required:true
        },
        geometry:{
            lat:{
                type:Number,
                required:true
            },
            lng:{
                type:Number,
                required:true
            }
        }
    }
},{collection:"addresses"})

let collection={}

collection.getUserCollection=()=>{
    return mongo.connect(url,{useNewUrlParser:true}).then((database)=>{
        return database.model("user",userSchema)
    })
    .catch(err=>{
        var error=new Error(err.message)
        error.status=500;
        throw error
    })
}

collection.getBooksCollection=()=>{
    return mongo.connect(url,{useNewUrlParser:true}).then((database)=>{
        return database.model("books",booksSchema)
    })
    .catch(err=>{
        var error=new Error(err.message)
        error.status=500;
        throw error
    })
}

collection.getAddressCollection=()=>{
    return mongo.connect(url,{useNewUrlParser:true}).then((database)=>{
        return database.model("addresses",addressSchema)
    })
    .catch(err=>{
        var error=new Error(err.message)
        error.status=500;
        throw error
    })
}


module.exports=collection;
