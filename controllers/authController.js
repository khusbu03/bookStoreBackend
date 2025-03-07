const {loginService}=require("../service/authService")

async function login(req,res){
    try{
        const response=loginService(req,res);

    }
    catch(error){

    }
}

module.exports={login}