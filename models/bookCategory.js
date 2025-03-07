const  mongoose=require("mongoose");

const bookCategorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
    },
    books:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }]
},{
    timestamps:true,
})

module.exports=mongoose.model("bookCategory",bookCategorySchema);