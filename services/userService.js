var db=require('../connections/schema')
var addressService=require('./addressService')
var userService={}

//create new user

userService.createNewUser=(user)=>{
    var userDetails=[user]
    return db.getUserCollection().then((usercollection)=>{
        return usercollection.insertMany(userDetails).then((data)=>{
            if(data){
                return "User creation successfull"
            }
            else{
                var err= new Error("User Creation Failed")
                throw err
            }
        })
    }).catch(err=>{
        throw  err
    })
}


//find user for login

userService.findUser=(username)=>{
    return db.getUserCollection().then((usercollection)=>{
        return usercollection.findOne({userName:username}).then((data)=>{
            if(data!=null){
                return data
            }
            else{
                throw new Error("User Not Found")
            }
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}


//find user by id
userService.findUserByUserid=(userid)=>{
    return db.getUserCollection().then((usercollection)=>{
        return usercollection.findOne({userid:userid},{_id:0,__v:0}).then((data)=>{
            if(data!=null){
                return data
            }
            else{
                throw new Error("User Not Found")
            }
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}


//user for emailid
userService.findUserByid=(userid)=>{
    return db.getUserCollection().then((usercollection)=>{
        return usercollection.findOne({userid:userid},{_id:0,email:1,mobNumber:1}).then((data)=>{
            if(data!=null){
                return data
            }
            else{
                throw new Error("User Not Found")
            }
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}

//return all users

userService.getAllUsers=()=>{
    return db.getUserCollection().then(usercollection=>{
        return usercollection.find({},{_id:0}).then(userData=>{
            return userData
        }).catch(err=>{
            throw err
        })
    })
    .catch(err=>{
        throw err
    })
}

//find usernames

userService.getAllUserNames=()=>{
    return db.getUserCollection().then(usercollection=>{
        return usercollection.find({},{_id:0,userName:1}).then(usernames=>{
            return usernames
        }).catch(Err=>{
            throw  Err
        })
    })
}

//edit user
userService.changeProfileSettings=(userid,name,email,phone,password)=>{
    return db.getUserCollection().then(usercollection=>{
        return usercollection.updateOne({userid:userid},{$set:{name:name,email:email,mobNumber:phone,password:password}}).then(data=>{
                return true

        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
})
}

//find user for books

userService.findBooks=(bookid)=>{
    return db.getUserCollection().then(usercollection=>{
        return usercollection.find({booksDonation: { $eq: bookid }},{_id:0,booksDonation:0,booksRequested:0,userName:0,password:0,__v:0}).then(userData=>{
           if(userData.length>0){
               let users=[]
               for(let user of userData){
                   return addressService.getAddress(user.address).then(data=>{
                        userData={
                            name:data.userDetails.name,
                            email:data.userDetails.contactDetails.email,
                            mobNumber:data.userDetails.contactDetails.mobNumber,
                            address:data.address
                        }
                        users.push(userData)
                        return userData
                   })
               }
           }
        }).catch(err=>{
            throw err
        })
    })
    .catch(err=>{
        throw err
    })
}

//add a book for user donation

userService.addBookForDonation=(userid,bookid)=>{
    return db.getUserCollection().then(usercollection=>{
        return usercollection.updateOne({userid:userid},{$push:{booksDonation:bookid}}).then(data=>{
            if(data.nModified>0){
                return true
            }
            else{
                let err=new Error("couldn't add books to specified user")
                throw err
            }
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}


// add a book for request

userService.addBookForRequest=(userid,bookid)=>{
    return db.getUserCollection().then(usercollection=>{
        return usercollection.updateOne({userid:userid},{$push:{booksRequested:bookid}}).then(data=>{
            if(data.nModified>0){
                return true
            }
            else{
                let err=new Error("couldn't add books to specified user")
                throw err
            }
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}

//add address for the user

userService.addAddress=(userid,addressid)=>{
    return db.getUserCollection().then(usercollection=>{
        return usercollection.updateOne({userid:userid},{$set:{address:addressid}}).then(data=>{
            if(data.nModified>0){
                return true
            }
            else{
                let err=new Error("couldn't add address to specified user")
                throw err
            }
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
    })
}

//add profile image for user

userService.changeProfile=(userid,path)=>{
    var imgPath=String(path)
    return db.getUserCollection().then(usercollection=>{
        return usercollection.updateOne({userid:userid},{$set:{imgPath:imgPath}}).then(data=>{
            if(data.nModified>0){
                return true
            }
            else{
                throw new Error("Couldn't change image")
            }
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        throw err
})
}


module.exports=userService