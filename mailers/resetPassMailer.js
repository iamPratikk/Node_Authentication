const nodeMailer = require("../config/nodeMailer");

const resetPassword = async (userData,otp)=>{
try{
    const htmlString = nodeMailer.renderTemplate({user:userData,otp:otp},'otpMail.ejs');
nodeMailer.transporter.sendMail({
    from : 'pratikpriyadarshi1998@gmail.com',
    to : userData.email,
    subject : "Reset your password with this OTP ",
    html : htmlString
},(err,info)=>{
    if(err){
        console.log("Error in sending email",err)
        return;
    }
    console.log("Mail Send Succesfully",info)
    return;
})
}catch(err){
    console.log(err);
}
}
module.exports = resetPassword;