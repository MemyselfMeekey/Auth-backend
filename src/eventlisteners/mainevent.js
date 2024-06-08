const {EventEmitter}=require("events")
const services=require("../auth/auth.service")
const myEvent=new EventEmitter()
const sendOtp=new EventEmitter()
myEvent.addListener("sendRegisterMail",async(data)=>{
    await services.sendRegEmail(data)
})
sendOtp.addListener("sendOtpMail",async(email,otp)=>{
    await services.sendOtp(email,otp)
})
module.exports={
    myEvent,
    sendOtp
}