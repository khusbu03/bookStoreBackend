class apiError extends Error{

    constructor(statusCode,message,error){
        super(error);
        this.message=message,
        this.statusCode=statusCode

    }

}