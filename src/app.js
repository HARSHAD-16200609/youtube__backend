import connectdb from "./db/db_connector.js";
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();


const app = express();
const port = process.env.PORT || 5000

//  middlewares 

app.use(express.join({limit:"16kb"}))
app.use(cors())
app.use(express.static("public"))
app.use(cookieParser())



connectdb(process.env.MONGO_URI)
.then(()=>{
    app.on("error",(error)=>{
        console.log(`ERROR: ${error}`);
        
    })
  app.listen(process.env.PORT,()=>{
    console.log(`DB Connected sucesssfully and server listening on port :${port}`);
    
  })
})
.catch((error)=>{
    console.log(`DB Failed to connect error : ${error}`);
    process.exit(1);
})
