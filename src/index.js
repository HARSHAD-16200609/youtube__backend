import connectdb from "./db/db_connector.js";
import dotenv from 'dotenv'
dotenv.config();


connectdb(process.env.MONGO_URI)