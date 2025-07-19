const express=require('express');
const router=express.Router();

const {registerController,loginController,testController, forgotPasswordController, 
  updateProfileController, getOrdersController} =require("../controllers/authControllers")
const {isAdmin,requireSignIn}=require("../middleware/authMiddlewares");


//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password",forgotPasswordController);

//test
router.get("/test",requireSignIn,isAdmin,testController);

//protected route
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);




module.exports = router;