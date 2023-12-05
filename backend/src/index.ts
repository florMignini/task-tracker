
import express from "express";
import cors from 'cors'
//db import
import connectDB from "../config/db";
//routes imports
import userRoutes from "../routes/userRoutes.ts";
import projectRoutes from "../routes/projectRoutes.ts";
import taskRoutes from "../routes/taskRoutes.ts";


const PORT= process.env.PORT || 3000;
const app = express();
app.use(express.json());
//DB connection 
connectDB()

//cors config
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: (origin:any, callback:any) => {
        if (whiteList.includes(origin)) {
            /* is allow to consult */
            callback(null, true)
        } else {
            /* is not allowed */
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))


//Router configuration
app.use("/user", userRoutes )
app.use("/projects", projectRoutes )
app.use("/tasks", taskRoutes )

const server = app.listen(PORT, ()=> {
    console.log(`listening on port: ${PORT}`);  
})

/* SOCKET IO */
import {Server} from "socket.io"
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
    origin: process.env.FRONTEND_URL
    }
})

// open connection
io.on('connection',(socket)=>{
    console.log(`connected to socket socket.io`)

    //create events
})