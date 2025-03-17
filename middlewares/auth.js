const {getTokenFromHeader,verifyAccessToken}=require("../utils/token")
const ApiResponse=require("../utils/apiUtils/apiResponse")
const ApiError =require("../utils/apiUtils/apiError")
const User=require("../models/user")

async function userAuth(req,res,next){
    try{
        const token=getTokenFromHeader(req);
        if(!token)return ApiError(400,"Access Token is missing");

        const isTokenValid=verifyAccessToken(token);
        if(!isTokenValid.success)return isTokenValid;
        const _id=isTokenValid.data._id; 

        const existingUser=await User.findById({_id});
        if(!existingUser) return new ApiError(400,"No user exists with this id!");

        req.body.user={_id:_id};
        next();
    }catch(error){
        return new ApiError(400,"User is not Authenticated!");
    }
}

module.exports={userAuth}