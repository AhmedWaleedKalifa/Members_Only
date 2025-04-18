const session = require("express-session");
const store = require("connect-pg-simple")(session);
const pool = require("./pool");


const sessionConfig = {
    store: new store({
        pool: pool,
        createTableIfMissing: true,
        tableName: "session",
        pruneSessionInterval: 240,
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, 
    rolling:false,
    cookie: { 
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
    }
};

module.exports = session(sessionConfig);