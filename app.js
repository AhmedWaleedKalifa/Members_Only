require("dotenv").config();
const express=require("express");
const path=require("node:path");
const sessionMiddleware=require("./database/session")
const passport = require('./config/passport');

const indexRouter=require("./routes/indexRouter");
const usersRouter=require("./routes/usersRouter");
const messagesRouter=require("./routes/messagesRouter");
const app =express();

app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
//first add express session middleware
app.use(sessionMiddleware);
// After session middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// app.use((req, res, next) => {
//     console.log('Session:', req.session);
//     console.log(req.user)
//     next();
//   });

app.use("/",indexRouter)
app.use("/users",usersRouter)
app.use("/messages",messagesRouter)
app.listen(process.env.PORT,()=>{
    console.log(`the app running at http://localhost:${process.env.PORT}`)
})


