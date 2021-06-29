var db=require("../connections/schema");
var setupService={}
var userData=[
    {
        userid:"UNM0001",
        name:"Kira",
        userName:"kir44",
        email:"kira@deathnote.com",
        mobNumber:9494949494,
        password:"Abc@1234",
        imgPath:"",
        address:"AD004",
        booksRequested: ["B0004","B0123"],
        booksDonation:[ "B047"]
    },
    {   
        userid:"UNM0004",
        name:"Arya",
        userName:"arya24",
        imgPath:"",
        email:"arya@gameofthrones.com",
        password:"Abc@1234",
        address:"AD014",
        booksRequested: ["B0004","B0044","B0123"],
        booksDonation:[ "B0004"]
    },
    {   
        userid:"UNM0024",
        name:"Patrick Jane",
        imgPath:"",
        userName:"PJ44",
        email:"patrick@thementalist.com",
        mobNumber:8484848484,
        password:"Abc@1234",
        address:"AD014",
        booksRequested: ["B0004","B0123"],
        booksDonation:[ "B0004"]
    },
    {   
        userid:"UNM0044",
        name:"Neil Caffrey",
        imgPath:"",
        userName:"NC44",
        email:"neil@whitecollar.com",
        password:"Abc@1234",
        address:"AD014",
        booksRequested: ["B0004","B0123","B0084"],
        booksDonation:[ "B0004"]
    },

]

var booksData=[
    {  
        bookid:"B0004",
        address:"AD004",
        name:"Murder on the orient express",
        author:"agatha christie",
        isbn:"13254574673465",
        bookCover:"htttp:///shome shihnt"
    },
    {  
        bookid:"B0044",
        address:"AD024",
        name:"Murder on the orient express",
        author:"agatha christie",
        isbn:"13254574673465",
        bookCover:"htttp:///shome shihnt"
    },
    {  
        bookid:"B0444",
        address:"AD004",
        name:"Murder on the orient express",
        author:"agatha christie",
        isbn:"13254574673465",
        bookCover:"htttp:///shome shihnt"
    },
    {  
        bookid:"B0024",
        address:"AD044",
        name:"Murder on the orient express",
        author:"agatha christie",
        isbn:"13254574673465",
        bookCover:"htttp:///shome shihnt"
    },
    {  
        bookid:"B0014",
        address:"AD014",
        name:"Murder on the orient express",
        author:"agatha christie",
        isbn:"13254574673465",
        bookCover:"htttp:///shome shihnt"
    },
    {  
        bookid:"B047",
        address:"AD024",
        name:"The psychology of money",
        author:"Morgan housel",
        isbn:"13254574673465",
        bookCover:"htttp:///shome shihnt"
    },
    {  
        bookid:"B0084",
        address:"AD014",
        name:"And then there were none",
        author:"agatha christie",
        isbn:"13254574673465",
        bookCover:"htttp:///shome shihnt"
    },
    {  
        bookid:"B0123",
        address:"AD044",
        name:"Immmortals of meluha",
        author:"Amish tripathi",
        isbn:"13254574673465",
        bookCover:"htttp:///shome shihnt"
    }
]

var addressData=[
    {   
        addressid:"AD004",
        userDetails:{
            name:"kira",
            contactDetails:{
                email:"kira@deathnote.com",
                mobNumber:9494949494
            }
        },
        address:{
            formattedAdress:"Hindupur, Andhra pradesh",
            geometry:{
                lat:13.818538,
                lng:77.498878
            }
        }
    },
    {   
        addressid:"AD014",
        userDetails:{
            name:"arya",
            contactDetails:{
                email:"arya@gameofthrones.com",
                mobNumber:8888888888
            }
        },
        address:{
            formattedAdress:"Kengeri",
            geometry:{
                lat:12.900160,
                lng:77.466591
            }
        }
    },
    {   
        addressid:"AD024",
        userDetails:{
            name:"Neil",
            contactDetails:{
                email:"neil@whitecollar.com",
            }
        },
        address:{
            formattedAdress:"Mysore",
            geometry:{
                lat:12.295810,
                lng:76.639381
            }
        }
    },
    {   
        addressid:"AD044",
        userDetails:{
            name:"Patrick",
            contactDetails:{
                email:"patrick@thementalist.com",
                mobNumber:8888888888
            }
        },
        address:{
            formattedAdress:"Kadiri",
            geometry:{
                lat:14.114500,
                lng:78.165398
            }
        }
    }
]

setupService.clearCollections=()=>{
    return db.getUserCollection().then((usercollection)=>{
        return  usercollection.deleteMany().then((data)=>{
            if(data){
               return db.getBooksCollection().then(bookscollection=>{
                   return bookscollection.deleteMany().then(data=>{
                       if(data){
                           return db.getAddressCollection().then(addresscollection=>{
                                return addresscollection.deleteMany().then(data=>{
                                    if(data){
                                        return true
                                    }
                                    else{
                                        throw new Error("address collection could not be deleted")
                                    }
                                })
                                .catch(err=>{
                                    throw err
                                })
                           }).catch(err=> {throw err})
                       }
                       else{
                           throw new Error("address collection could not be deleted")
                       }
                   }).catch(err=>{throw err})
               }).catch(err=>{throw err})
            }
        }).catch(err=>{
            throw new Error(err.message)
        })
    }).catch(err=>{
        throw new Error(err.message)
    })
        
}


setupService.setupUserCollections=()=>{
    try{
        return db.getUserCollection().then((usercollection)=>{
            return  usercollection.deleteMany().then(()=>{
                try{
                    return usercollection.insertMany(userData).then((data)=>{
                        if(data){
                           return true;
                        }
                        else{
                            throw new Error("failed")
                        }
                        
                    })
                }
                catch(err){
                   throw new Error("failed db operation")
                }
             })
         })
    }
    catch(err){
        throw new Error("failed")
    }
}

setupService.setupAddressCollection=()=>{
    try{
        return db.getAddressCollection().then((addresscollection)=>{
            return  addresscollection.deleteMany().then(()=>{
                try{
                    return addresscollection.insertMany(addressData).then((data)=>{
                        if(data){
                           return true;
                        }
                        else{
                            throw new Error("failed")
                        }
                        
                    })
                }
                catch(err){
                   throw new Error("failed db operation")
                }
             })
         })
    }
    catch(err){
        throw new Error("failed")
    }
}
setupService.setupBooksCollections=()=>{
    try{
        return db.getBooksCollection().then((bookscollection)=>{
            return  bookscollection.deleteMany().then(()=>{
                try{
                    return bookscollection.insertMany(booksData).then((data)=>{
                        if(data){
                           return true;
                        }
                        else{
                            throw new Error("failed")
                        }
                        
                    })
                }
                catch(err){
                   throw new Error("failed db operation")
                }
             })
         })
    }
    catch(err){
        throw new Error("failed")
    }
}

module.exports=setupService