const {Router}=require("express");
const indexRouter=Router();

const indexController=require("../controllers/indexController")
indexRouter.get("/",indexController.getHome)
indexRouter.get("/club",indexController.clubGet)
indexRouter.post("/club",indexController.clubPost);

module.exports=indexRouter