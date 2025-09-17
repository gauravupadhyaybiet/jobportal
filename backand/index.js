import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userroute.js"
import  companyRoute  from "./routes/companyroute.js";
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js";

dotenv.config({});
const app = express();
app.use(express());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const allowedOrigin = 'http://localhost:5173';

// Use the cors middleware with specific origin
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));
app.get("/",(req,res)=>{
    
    res.send("something is wrong");
    console.log("every thing is fine");
 });
 app.use("/api/v1/user",userRoute);
 app.use("/api/v1/company",companyRoute);
 app.use("/api/v1/job",jobRoute);
 app.use("/api/v1/application",applicationRoute);


app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("server running at 3000");
});
