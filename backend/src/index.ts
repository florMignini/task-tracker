
import express from "express";
//db import
import connectDB from "../config/db";
//routes imports
import userRoutes from "../routes/userRoutes.ts";


const PORT= process.env.PORT || 3000;
const app = express();
app.use(express.json());
//DB connection 
connectDB()

//Router configuration
app.use("/user", userRoutes )

app.listen(PORT, ()=> {
    console.log(`listening on port: ${PORT}`);  
})