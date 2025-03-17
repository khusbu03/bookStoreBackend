const bcrypt=require("bcrypt");
const ApiError = require("./apiUtils/apiError");
const ApiResponse=require("./apiUtils/apiResponse")

async function createHash(payload){
    try{
        const hashedPassword= await bcrypt.hash(payload,10);
        return new ApiResponse(200,"password hash created succesfully",hashedPassword)
    }
    catch(error){
        return new ApiError(500,"Failed to create hash of password")
    }
}

async function verifyHash(password,hashedPassword){
    try{
        const isValid= await bcrypt.compare(password,hashedPassword);
        return new ApiResponse(200,"password matched",isValid);
    }
    catch(error){
        return new ApiError(400,"Invalid credentials")
    }
}

module.exports={verifyHash,createHash}