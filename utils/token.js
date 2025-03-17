const jwt = require("jsonwebtoken");
const ApiResponse = require("./apiUtils/apiResponse");
const ApiError = require("./apiUtils/apiError")

function createAccessToken(payload) {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1d' });
    return token;
}

function createRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" });
}

function verifyRefreshToken(token) {
    try {
        const token = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
        return ApiResponse(200, " Token is valid", token);
    }
    catch (error) {
        return ApiError(400, "Refresh Token is invalid")
    }
}

function verifyAccessToken(token) {
    try {
        const token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        return ApiResponse(200, "Token is valid", token);
    }
    catch (error) {
        return ApiError(400, "Access Token is invalid")
    }
}

function getTokenFromHeader(req) {
    return req.headers["authorization"].replace("Bearer ", "");
}
module.exports = { createRefreshToken, createAccessToken, getTokenFromHeader, verifyAccessToken, verifyRefreshToken }

