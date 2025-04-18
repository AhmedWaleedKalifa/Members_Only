const db=require("../database/queries")
require("dotenv").config();
async function getHome(req,res){
        const messages=await db.getAllMessages();
        res.render("index.ejs",{title:"Members Only",messages:messages})
}
async function clubGet(req,res) {
    res.render("clubForm.ejs",{title:"Club secret form"})
}
async function clubPost(req,res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/login');
    }
    if(req.body.secret==process.env.CLUB_PASSWORD){
        const user=await db.getUser(res.locals.currentUser.id);
        await db.updateUser(user.firstname,user.lastname,user.password,user.id,"member")
        res.redirect("/");
    }
}
module.exports={
    getHome,
    clubGet,
    clubPost
}
