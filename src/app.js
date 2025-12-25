import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors';
import Userrouter from './routes/user.routes.js';
import videoRouter from './routes/videos.route.js';


const app = express();


//  middlewares 

app.use(cors({
    origin: "http://localhost:8000",
    credentials: true
}))
app.use(express.json({limit:"16kb"}))

app.use(express.static("public"))
app.use(cookieParser())
app.use("/api/v1/users",Userrouter)
app.use("/api/v1/videos",videoRouter)





 export default app;