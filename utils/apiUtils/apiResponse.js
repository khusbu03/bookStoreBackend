class ApiResponse{
    constructor(statusCode,message,data){
        this.message=message;
        this.success= statusCode<400;
        this.data= data;
        this.statusCode= statusCode;

    }
};
module.exports=ApiResponse;