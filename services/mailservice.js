const nodemailer = require('nodemailer');

const mailService={}

mailService.sendMail=async  (data)=>{
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 587,
    auth: {
        user: '4af27f51053216',
        pass: '02c68ff507fc4a'
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'you', // sender address
    to: "karanamc3@gmail.com", // list of receivers
    subject: "visitor details", // Subject line
    text: data.name +" "+"has sent message"+" "+data.message+ " "+"his contact details are:"+ data.email+ " , "+data.contactNo, // plain text body
    html: "<p>data.message</p>", // html body
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