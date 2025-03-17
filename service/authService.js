const User=require("../models/user");
const ApiResponse=require("../utils/apiUtils/apiResponse")
const ApiError =require("../utils/apiUtils/apiError")
const {createHash,verifyHash}=require("../utils/hash")
const {createAccessToken,createRefreshToken,getTokenFromHeader,verifyRefreshToken, verifyAccessToken}=require("../utils/token")
const generateOtp=require("../utils/OTP")
const sendEmail=require("../config/nodemailer")

async function loginService(req,res){
    try{
        const {emailId,password}=req.body;

        const existingUser=await User.findOne({emailId});
        if(!existingUser)return new ApiError(400,"Invalid credentials!");

        const isValidPassword=await verifyHash(password,existingUser.password);
        if(!isValidPassword.success)return isValidPassword;
        console.log("isValidpassword",isValidPassword);

        const accessToken= createAccessToken({_id:existingUser._id});
        const refreshToken=createRefreshToken({_id:existingUser._id});   

        const updatedUser=await User.findOneAndUpdate({emailId},{token:refreshToken},{new:true});
        return new ApiResponse(200,"Logged In!",{refreshToken:refreshToken,accessToken:accessToken})
    }
    catch(error){
        console.log("error",error)
        return new ApiError(500,"Can't login!")
    }
}

async function signupService(req,res){
    try{
        const {userName,emailId,password,role}=req.body;

        const existingUser=await User.findOne({emailId});
        if(existingUser)return new ApiError(400,"This email already exists!");

        const hashedPassword=await createHash(password);
        if(!hashedPassword.success) return hashedPassword;
       
        const newUser= new User({userName,emailId,password:hashedPassword.data,role});
        await newUser.save();
        newUser.password=undefined;
        console.log("new user",newUser)
        return new ApiResponse(200,"User registered successfully!",newUser);
    }
    catch(error){
        return new ApiError(500,"Registration failed!Try again!");
    }
}

async function updatePasswordService(req,res){
    try{
        const {emailId,newPassword}=req.body;

        const existingUser=await User.findOne({emailId});
        if(!existingUser)return new ApiError(400,"User does not exist!");

        const hashedPassword=await createHash(newPassword);
        if(!hashedPassword.success) return hashedPassword;
       
        const newUser=await  User.find({emailId},{password:hashedPassword.data});
        newUser.password=undefined;
        return new ApiResponse(200,"Password updated successfully!",newUser);
    }
    catch(error){
        return new ApiError(500,"Failed to update Password!Try again!");
    }
}

async function forgotPasswordService(req,res){
    try{
        const {emailId}=req.body;

        const existingUser=await User.findOne({emailId});
        if(!existingUser)return new ApiError(400,"Invalid credentials");

        const otpResponse=generateOtp();
        if(!otp.success)return otpResponse;
        console.log("otp response",otpResponse)

        const otp=otpResponse.data.otp;

        const token=createAccessToken({_id:existingUser._id});

        const emailResponse= await sendEmail({OTP:otp,emailId:emailId,token:token})
        if(!emailResponse.success)return emailResponse;
        const hashedOtp=await createHash(otp);

        const updatedUser=await User.findOneAndUpdate({emailId},{otp:hashedOtp},{new:true});

        return new ApiResponse(200,"OTP sent!");
    }
    catch(error){
        return new ApiError(500,"Failed to send otp!");
    }
}

async  function verifyOTPService(req){
    try{
        const {OTP}=req.body;
        const {token}=req.params;

        const isValidToken=verifyAccessToken(token);
        if(!isValidToken.success)return new ApiError(400,"Token is not valid");
        const {_id}=isValidToken.data

        const existingUser=await User.findById({_id});

        const isValidOtp=verifyHash(OTP,existingUser.otp);
        if(!isValidToken.success)return new ApiError(400,"Invalid OTP!");

        return new ApiResponse(200,"OTP matched!")
    }
    catch(error){
        return new ApiError(400,"Can't verify otp!")
    }
 
}

async  function changePasswordService(req){
    try{
        const {emailId,newPassword}=req.body;

        const existingUser=await User.findOne({emailId});
        if(!existingUser)return new ApiError(400,"user does not exist!");

        const newPasswordHash=await createHash(newPassword);
        if(!newPasswordHash.success)return new ApiError(400,"Could'nt create password hash");

        const hashedPassword=newPasswordHash.data;

        const updatedUser=await User.findOneAndUpdate({emailId},{password:hashedPassword},{new:true})
        return new ApiResponse(200,"Password changed!")
    }
    catch(error){
        return new ApiError(400,"Failed to change password!")
    }
 
}

module.exports={signupService,loginService,updatePasswordService,forgotPasswordService,verifyOTPService,changePasswordService}