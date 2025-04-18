const {Router}=require("express");
const usersRouter=Router();

const usersController=require("../controllers/usersController")
usersRouter.get("/",usersController.getUsers)
usersRouter.get("/sign-up",usersController.addUserGet)
usersRouter.post("/sign-up",usersController.addUserPost)
usersRouter.get("/login",usersController.loginGet)
usersRouter.post("/login",usersController.loginPost)
usersRouter.get("/log-out",usersController.logOutPost);
module.exports=usersRouter