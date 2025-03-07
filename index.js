const express=require("express")
const app=express();
const cookieParser=require("cookie-parser")

require("dotenv").config();

const dbConnect=require("./config/database");
const bookStoreRoutes=require("./routes/index")

dbConnect().then(()=>{
    console.log("DB Connected");

    app.listen(process.env.PORT,()=>{
        console.log(`Server is live and running at ${PORT} port`);
    })
})
.catch((error)=>console.log("Error occurred while connecting Db",error.message));

app.use(express.json());
app.use(cookieParser());

app.use("/bookStore",bookStoreRoutes);
