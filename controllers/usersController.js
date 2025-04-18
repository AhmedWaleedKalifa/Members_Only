const db=require("../database/queries")
const bcrypt=require("bcrypt")
const passport=require("../config/passport")
const {body,validationResult}=require("express-validator")
const validateUser=[
    body("firstName")
    .trim()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9\_]+$/)
    .withMessage("First name must be alphabetic or number or _")
    .isLength({min:3,max:20})
    .withMessage("First name must be between 3 to 20 characters"),

    body("lastName")
    .trim()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9\_]+$/)
    .withMessage("Last name must be alphabetic or number or _")
    .isLength({min:3,max:20})
    .withMessage("Last name must be between 3 to 20 characters"),

    body("username")
    .trim()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9\_]+$/)
    .withMessage("first name must be alphabetic or number or _")
    .isLength({min:2,max:30})
    .withMessage("name must be between 2 to 30 characters"),

    body("password")
    .trim()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9\_\@\%\$]+$/)
    .withMessage("Password must be alphabetic or number or _ @ % $")
    .isLength({min:8,max:30})
    .withMessage("name must be between 8 to 30 characters"),

    body("confirmPassword")
    .trim()
    .custom((value,{req})=>{
        if(value !==req.body.password){
            throw new Error("Password confirmation does not match password")
        }
        return true;
    })

]

module.exports.getUsers=async function (req,res) {
    if(req.isAuthenticated()&&req.user.admin){
            const users=await db.getUsers();
            res.render("users.ejs",{title:"Users",users:users})
    }else{
        res.redirect("/")
    }
    
}
module.exports.addUserGet=async function(req,res) {
    res.render("signUpForm.ejs",{title:"Sign Up"})
}
module.exports.addUserPost=[
    validateUser,
    async function(req,res) {
        let errors=validationResult(req);
        if(errors.isEmpty()){
            const firstName=req.body.firstName;
            const lastName =req.body.lastName;
            const username=req.body.username;
            const password=await bcrypt.hash(req.body.password,10);
            const bool=await db.isValidUser(username);
            if(!bool){
                const errorsArray=[{msg:"Change username"}];
                res.status(400).render("signUpForm.ejs",{title:"Sign Up",errors:errorsArray})
            }else{
                await db.addUser(firstName,lastName,username,password,"not-member");
                res.redirect("/")
            }
        }else{
            const errorArray=errors.array();
            errorArray.push({msg:"Change username"});
            res.status(400).render("signUpForm.ejs",{title:"Sign Up",errors:errorArray})
        }
        
}]

module.exports.loginGet=async function (req,res) {
    res.render("loginForm.ejs",{title:"Login Form"})
}

module.exports.loginPost = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  });

module.exports.logOutPost=async function (req,res,next) {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}
