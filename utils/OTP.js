const otpGenerator = require('otp-generator');
const ApiError=require("./apiUtils/apiError")
const ApiResponse=require("./apiUtils/apiResponse")

function generateOtp(){
    try{
        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        return ApiResponse(200,"OTP generated",OTP)
    }
    catch(error){
        return ApiError(500,"Error in generating otp!")
    }
}

module.exports=generateOtp;