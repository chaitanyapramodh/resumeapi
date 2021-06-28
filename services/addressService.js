var db=require("../connections/schema");
var addressService={}

addressService.addAddress=(arrayOfAdd)=>{
  return db.getAddressCollection().then(addresscollection=>{
       return addresscollection.insertMany(arrayOfAdd).then(data=>{
            if(data){
                return true;
            }
        }).catch(err=>{
            throw  err
        })
   }).catch(err=>{
        throw  err
})
}


//return all addresses

addressService.showAllAddresses=()=>{
    return db.getAddressCollection().then(addresscollection=>{
        return addresscollection.find({},{_id:0,__v:0}).then(data=>{
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

addressService.getAddress=(addressid)=>{
    return db.getAddressCollection().then(addresscollection=>{
        return addresscollection.findOne({addressid:addressid},{__v:0,_id:0,addressid:0}).then(data=>{
            return data
        }).catch(err=>{
            throw err
        })
    })
}


module.exports=addressService