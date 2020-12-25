const nodemailer = require('nodemailer');

const mailService={}

mailService.sendMail=async  (data)=>{
  let transporter = nodemailer.createTransport({
    // host: 'email-smtp.us-east-2.amazonaws.com',
    host: 'mail.aurasol.in',
    port: 465,
    auth: {
        user: 'chaitanya@aurasol.in',
        pass: 'QUjSN3]3W83r'
    },
    // auth:{
    //   user:'4af27f51053216',
    //   pass:'02c68ff507fc4a'
    // }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'chaitanya@aurasol.in', // sender address
    to: "chaitanya@aurasol.in", // list of receivers
    subject: "visitor details", // Subject line
    html: `<div style="text-align: center;margin-top:14vh">
    <h1 style="color: red;">Hello chethu</h1>
    <h2 style="color: royalblue;"> ${data.name} has sent a message</h2>
    <p style="font-size: 24px;color:#000;">${data.message}</p><br>
    <div style="font-weight: 400;">
    <span style="font-weight: 600;">His contact details are</span>
    <div style="font-size: 32px;">
        email:<span style="font-size: 36px;">${data.email}</span><br>
        phoneno:<span  style="font-size: 36px;">${data.contactNo}</span>
    </div>
</div>
</div>`
  });

  // console.log("Message sent: %s", info.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  if(info.messageId){
    return info.messageId
  }

}

module.exports=mailService