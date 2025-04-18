const {Router}=require("express");
const messagesRouter=Router();

const messagesController=require("../controllers/messagesController")
messagesRouter.get("/add",messagesController.addMessageGet)
messagesRouter.post("/add",messagesController.addMessagePost)
messagesRouter.post("/delete/:id",messagesController.deleteMessagePost)
messagesRouter.post("/get/:id",messagesController.messageDetailsGet)
module.exports=messagesRouter