const {loginService,signupService,updatePasswordService,forgotPasswordService,verifyOTPService,changePasswordService}=require("../service/authService")
const ApiResponse=require("../utils/apiUtils/apiResponse")
const ApiError =require("../utils/apiUtils/apiError")
const {createAccessToken,verifyRefreshToken}=require("../utils/token")

async function login(req,res){
    try{
        const loginResponse=await loginService(req,res);
        if(!loginResponse.success) throw loginResponse;

        return res.status(loginResponse.statusCode).json({
            success:true,
            message:loginResponse.message,
            data:loginResponse.data
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
}

async function signup(req,res){
    try{
        const signupResponse=await signupService(req,res);
        if(!signupResponse.success) throw signupResponse;
        console.log("res=>",signupResponse)

        return res.status(signupResponse.statusCode).json({
            success:true,
            message:signupResponse.message,
            data:signupResponse.data
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
}

async function createAccessToken(req,res){
    try{
        const refreshtoken=getTokenFromHeader(req);
        const isTokenValid=verifyRefreshToken(refreshtoken);
        if(!isTokenValid.success)return isTokenValid;
        const _id=isTokenValid.data._id; 

        const existingUser=await User.findById({_id});
        if(!existingUser) return new ApiError(400,"No user exists with this id!");

        const accessToken=createAccessToken({_id:_id});
        const refreshToken=createRefreshToken({_id:_id});

        const updatedUser=await User.findOneAndUpdate({_id},{refreshToken},{new:true});

        return new ApiResponse(200,"Access token generated successfully!",{accessToken:accessToken,refreshToken:refreshToken})
    }catch(error){
        return new ApiError(500,"Can't generate access Token.Login again!")
    }
}

async function updatePassword(req,res){
    try{
        const updatePasswordResponse=await updatePasswordService(req);
        if(!updatePasswordResponse.success) throw updatePasswordResponse;

        return res.status(updatePasswordResponse.statusCode).json({
            success:true,
            message:updatePasswordResponse.message,
            data:updatePasswordResponse.data
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
}

async function forgotPassword(req,res){
    try{
        const forgotPasswordResponse=await forgotPasswordService(req);
        if(!forgotPasswordResponse.success) throw forgotPasswordResponse;

        return res.status(forgotPasswordResponse.statusCode).json({
            success:true,
            message:forgotPasswordResponse.message,
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
}

async function verifyOTP(req,res){
    try{
        const verifyOTPResponse=await verifyOTPService(req);
        if(!verifyOTPResponse.success) throw verifyOTPResponse;

        return res.status(verifyOTPResponse.statusCode).json({
            success:true,
            message:verifyOTPResponse.message,
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
}

async function changePassword(req,res){
    try{
        const changePasswordResponse=await changePasswordService(req);
        if(!changePasswordResponse.success) throw changePasswordResponse;

        return res.status(changePasswordResponse.statusCode).json({
            success:true,
            message:changePasswordResponse.message,
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
}

module.exports={login,signup,createAccessToken,updatePassword,forgotPassword,verifyOTP,changePassword}