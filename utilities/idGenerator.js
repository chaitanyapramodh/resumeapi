var idGen=(type)=>{
    if(type=="U"){
        var uid="U"+'_' + Math.random().toString(36).substr(2, 4);
        return uid 
    }
    else if(type=="B"){
        var bid="B"+'_' + Math.random().toString(36).substr(2, 4);
        return bid;
    }
    else if(type=="A"){
        var aid="A"+'_' + Math.random().toString(36).substr(2, 4);
        return aid;
    }
}

module.exports=idGen