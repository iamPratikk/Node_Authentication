const express = require('express');
const app = express();
const port = 4000;
const expressLayout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
// user for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passportLocal");
const passportGoogle = require("./config/passport-google-oauth");
const db = require("./config/mongoose");
const flash = require("connect-flash");
const customMW = require('./config/middleware');
const env =require("./config/environment");

//MW to set the layout before the views----
app.use(expressLayout);

//MW to read the post request data 
app.use(express.urlencoded());

//MW to use the CookieParser
app.use(cookieParser());

app.use(express.static("./assets"));

//extract style and scripts from sub pages to the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting the View engine in my Express server
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    name: "codeial",
    //change the secret before production
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000000,
    }

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMW.setFlash);


app.use("/", require("./routes"));

app.listen(port, function(err){
    if(err){
        console.log("Error in starting server", err)
    }
    console.log("Server running at port: ", port);

})