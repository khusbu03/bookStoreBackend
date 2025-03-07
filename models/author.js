const  mongoose=require("mongoose");

const authorSchema=new mongoose.Schema({
    authorName:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    booksWritten:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }]
},{
    timestamps:true,
})

module.exports=mongoose.model("Author",authorSchema);