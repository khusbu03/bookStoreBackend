const express=require("express")
const app=express();
const cookieParser=require("cookie-parser")

require("dotenv").config();
const PORT=process.env.PORT||3000;

const dbConnect=require("./config/database");
const bookStoreRoutes=require("./routes/index")

dbConnect().then(()=>{
    console.log("DB Connected");

    app.listen(PORT,()=>{
        console.log(`Server is live and running at ${PORT} port`);
    })
})
.catch((error)=>console.log("Error occurred while connecting Db",error.message));

app.use(express.json());
app.use(cookieParser());

app.use("/bookStore",bookStoreRoutes);
