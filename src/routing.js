const express = require ("express");
const AuthCtrl = require("./auth/auth.controller");
const { regSchema,passwordSetSchema,resendToken, loginDto,passwordChangeSchema,forgetPass}=require("./auth/auth.rules")
const bodyvalidator = require("./middlewares/bodyvalidator");
const { pathSet, uploader } = require("./middlewares/fileuploads");
const loginCheck=require("./middlewares/login-middleware")


const router=express.Router()

router.post("/registration",pathSet("/uploads/user"),uploader.single("image"),bodyvalidator(regSchema),AuthCtrl.registration)
router.get("/verification/:token",AuthCtrl.verificationToken)
router.post("/resendverification",bodyvalidator(resendToken),AuthCtrl.resendActivationToken)
router.post("/activation/:token",bodyvalidator(passwordSetSchema),AuthCtrl.activation)

router.post("/login",bodyvalidator(loginDto),AuthCtrl.login)
router.post("/verify-otp",AuthCtrl.verifyOtp)
router.get("/dashboard",loginCheck,AuthCtrl.dashboard)
router.post("/change-pass",loginCheck,bodyvalidator(passwordChangeSchema),AuthCtrl.changepass)

router.post("/forgetpass",bodyvalidator(forgetPass),AuthCtrl.forgetpass)
router.post("/forgetpass/:token/verification",AuthCtrl.frogetpasstokenverify)
router.post("/setpass/:token",bodyvalidator(passwordSetSchema),AuthCtrl.setforgetPass)
router.post('/logout',loginCheck,AuthCtrl.logOut)
router.use((req, res, next) => {
    res.status(404).json({
      result: {},
      message: "You have entered the wrong URL",
      meta: null
    });
  });

module.exports=router
