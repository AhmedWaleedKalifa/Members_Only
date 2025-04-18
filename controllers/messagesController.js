const { use } = require("passport");
const db=require("../database/queries")

async function addMessageGet(req,res) {
    res.render("addMessageForm.ejs",{title:"Add Message"})
}
async function addMessagePost(req,res) {
    const title=req.body.title;
    const content =req.body.content;
    const user=req.user;
    await db.addMessage(title,content,user.username);
    res.redirect("/");
}
async function messageDetailsGet(req,res){
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

async function deleteMessagePost(req,res) {
    const id=req.params.id;
    await db.deleteMessage(id);
    res.redirect("/")
}
module.exports={
    addMessageGet,
    addMessagePost,
    deleteMessagePost,
    messageDetailsGet
}