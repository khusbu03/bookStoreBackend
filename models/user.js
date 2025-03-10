const  mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    emalId:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"]
    },
    imageUrl:{
        type:String,
    },
    refreshToken:{

    },
    otp:{
        type:Number
    },
    booksPurchased:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }],
},{
    timestamps:true,
})

module.exports=mongoose.model("User",userSchema);