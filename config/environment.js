const development = {
    name : "development",
    session_cookie_key : process.env.AUTHENTICATION_SESSION_KEY,
    db : "NodeAuthetication",
    smtp : {
        service : 'gmail',
        host : 'smpt.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.AUTHENTICATION_SMTP_USER,
            pass : process.env.AUTHENTICATION_SMTP_PASS
        }
    },
    google_clientID : process.env.AUTHENTICATION_GOOGLE_CLIENT_ID,
    google_clientSecret : process.env.AUTHENTICATION_GOOGLE_CLIENT_SECRET,
    google_callbackURL : process.env.AUTHENTICATION_CALLBACK_URL

}

const production = {
    name : "production",
    session_cookie_key : process.env.AUTHENTICATION_SESSION_KEY,
    db : "NodeAuthetication",
    smtp : {
        service : 'gmail',
        host : 'smpt.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.AUTHENTICATION_SMTP_USER,
            pass : process.env.AUTHENTICATION_SMTP_PASS
        }
    },
    google_clientID : process.env.AUTHENTICATION_GOOGLE_CLIENT_ID,
    google_clientSecret : process.env.AUTHENTICATION_GOOGLE_CLIENT_SECRET,
    google_callbackURL : process.env.AUTHENTICATION_CALLBACK_URL

}

module.exports = eval(process.env.AUTHENTICATION_NODE_ENVIRONMENT) == undefined ? development: eval(process.env.AUTHENTICATION_NODE_ENVIRONMENT);