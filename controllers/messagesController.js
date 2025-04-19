const { use } = require("passport");
const db=require("../database/queries")
const {body,validationResult}=require("express-validator")
const validateMessage=[
    body("title")
    .trim()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9\_\s]+$/)
    .withMessage("Title must be alphabetic or number or _")
    .isLength({min:3,max:30})
    .withMessage("Title name must be between 3 to 30 characters"),

    body("content")
    .trim()
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9\_\s\,\.\:]+$/)
    .withMessage("Content must be alphabetic or number or _ , . :")
    .isLength({min:3,max:50})
    .withMessage("Content name must be between 3 to 50 characters"),

]

module.exports.addMessageGet=async function(req,res) {
    res.render("addMessageForm.ejs",{title:"Add Message"})
}
module.exports.addMessagePost=[
    validateMessage,
    async function (req,res) {
    let errors=validationResult(req);
    if(errors.isEmpty()){
    const title=req.body.title;
    const content =req.body.content;
    const user=req.user;
    await db.addMessage(title,content,user.username);
    res.redirect("/");
    }else{
        const errorArray=errors.array();
            res.status(400).render("addMessageForm.ejs",{title:"Add Message",errors:errorArray})
    }
}]
module.exports.messageDetailsGet=async function (req,res){
    if(req.isAuthenticated()){
        const message=await db.getMessage(req.params.id)
        console.log(message)
        res.render("messageDetails.ejs",{message:message})
    }else{
        res.redirect("/")
    }
   
}
// async function updateMessageGet(req,res) {
//     //message id 
//     //use id
//     res.render("updateMessageForm.ejs",{title:"update Message"})
// }
// async function updateMessagePost(req,res) {
//     const title=req.body.title;
//     const content =req.body.content;
//     // const id=
//     // await db.updateMessage(title,content,id)
//     res.redirect("/");
// }

module.exports.deleteMessagePost=async function (req,res) {
    const id=req.params.id;
    await db.deleteMessage(id);
    res.redirect("/")
}
