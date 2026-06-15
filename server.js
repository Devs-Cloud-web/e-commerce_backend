import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

// app.get("/greet",(req,res)=>{
//     res.send("Hello user ! Greetings from the server")
// })

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})