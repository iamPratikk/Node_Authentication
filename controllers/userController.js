const User = require("../models/User");
const resetPassword = require("../mailers/resetPassMailer");
module.exports.home = async (req,res,next)=>{
    // console.log(req.user);

    return res.render("home");
}

module.exports.createUser = async (req,res,next)=>{
    // console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        req.flash("error"," Password didn't match");
        return res.redirect("back");
      }
      try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            console.log("user already present in db");
            req.flash("success","user already present in db");
            res.redirect("back");
        }else{
            User.create(req.body)
            console.log("user created in db");
            req.flash("success","user created in db");
            res.redirect('/users/sign-in');
            }
      }catch(err){
        console.log("Error in creating user in DB", err);
        req.flash("error","Error in creating user in DB");
      }
}

module.exports.signUp = async (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/')
      }
      return res.render("sign-up");
    // res.render("sign-up");
}
module.exports.signIn = async (req,res,next)=>{
    res.render("sign-in");
}
module.exports.createSession = async(req,res,next)=>{
    
    if(req.isAuthenticated){
        req.flash("success","Logged in succesfully");
        return res.redirect("/");
    }
    return res.redirect("/users/sign-in");
}
module.exports.signOut = async (req,res)=>{
    
    req.logout((err)=>{
        if(err){
          console.log("error while logging out");
          req.flash("error","error while logging out");
          
        }
        req.flash("success","Logged out succesfully")
        res.redirect("/users/sign-in")
      });
}
module.exports.resetPassword = async (req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        if(user && user.password == req.body.oldPassword){
           if(req.body.newPassword==req.body.confirmPassword){
            user.password = req.body.newPassword;
            user.save();
            req.flash("success", "Password changed");
            res.redirect("/");
           }else{
            req.flash("error","passwords didnt match")
            console.log("New passwords didnt match")
            res.redirect("back")
           } 
        }else{
            req.flash("error","old password is incorrect")
            console.log("old password is incorrect")
            res.redirect("back")
        }
    }catch(err){
        console.log("error in resetting the password")
    }
   }
module.exports.resetPage = async (req,res)=>{
    res.render("reset_password");
}
module.exports.forgotPage = async (req,res)=>{
    res.render("forgot_password");
}
module.exports.forgetPassword = async (req,res)=>{
    const checkMail = req.body.email;
    try{
        const user = await User.findOne({email : checkMail});
        if(user){
            //This resetPassord is the mailer function that takes care of the mailing task
            let otp = await otpGenerator();
            resetPassword(user,otp);
            console.log("OTP sent succesfully");
            req.flash("success", "OTP sent succesfully");
            user.password = otp;
            user.save();
            res.redirect("/users/sign-in")
        }
    }catch(err){
        console.log("Something went wrong", err)
    }
}
const otpGenerator = async ()=>{
    const chars = "abcdefghijklmnopqrstuvwxyz123456789";
    let otp="";
    for(let i=0; i<6;i++){
       let randomNumber = Math.floor(Math.random()*chars.length);
       otp+=chars[randomNumber];
    }
    return otp;
}