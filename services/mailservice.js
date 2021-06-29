const nodemailer = require('nodemailer');
let mailService={}

mailService.sendMail=async  (data,type)=>{
    let transporter = nodemailer.createTransport({
      host: 'email-smtp.us-east-2.amazonaws.com',
      port: 465,
      auth:{
        user:'AKIAY6URLYIG4GBR5FQV',
        pass:'BM7wb2M3YSxNsKef2PyoB/oN+Rtx4LZHLpDZkGwK7QLr'
      }

    });
  
    // send mail with defined transport object
    if(type=="1"){
      let info = await transporter.sendMail({
        from: 'resumemailservice@protonmail.com', // sender address
        to: "karanamchaitanyapramod@gmail.com", // list of receivers
        subject: "Review details", // Subject line
        html: `<div style="text-align: center;margin-top:14vh">
        <h1 style="color: red;">Hello chethu</h1>
        <h2 style="color: royalblue;"> <span style="color:#FFD54F ;"> ${data.name}</span> has  given a review</h2>
        <h2 style="color: red;"> What went well:</h2>
        <p style="color: #FFD54F;"> ${data.wentwell}</p>
        <h2 style="color: red;"> What could have been  better: </p>
          <p style="color: #FFD54F;"> ${data.couldBeBetter}</p>
          <h2  style="color: red;">  over all rating: <span style="color: #D500F9;">${data.rating}</span> </h2><br>
        <div style="font-weight: 400;">
        <span style="font-weight: 600;">His contact details are</span>
        <div style="font-size: 22px;">
            email:<span style="font-size: 16px;color: #D500F9;">${data.email}</span><br>
            phoneno:<span  style="font-size: 16px;color: #D500F9">${data.contactNo}</span>
        </div>
      </div>
      </div>`
      });
      if(info.messageId){
        return info.messageId
      }
    
    }
    else if(type=="2"){
      let info = await transporter.sendMail({
        from: 'resumemailservice@protonmail.com', // sender address
        to: "karanamchaitanyapramod@gmail.com", // list of receivers
        subject: "Someone contacted you", // Subject line
        html: `<div style="text-align: center;margin-top:14vh">
        <h1 style="color: red;">Hello chethu</h1>
        <h2 style="color: royalblue;"> <span style="color:#FFD54F ;"> ${data.name}</span> has  sent  a mail</h2>
        <h2 style="color: red;"> His/her message:</h2>
        <p style="color: #FFD54F;"> ${data.message}</p>
        <span style="font-weight: 600;">His/Her contact details are</span>
        <div style="font-size: 22px;">
            email:<span style="font-size: 16px;color: #D500F9;">${data.email}</span><br>
            phoneno:<span  style="font-size: 16px;color: #D500F9">${data.contactNo}</span>
        </div>
      </div>
      </div>`
      });
      if(info.messageId){
        return info.messageId
      }
    
    }
  
  }

  module.exports=mailService