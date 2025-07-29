//express
const express=require('express');
const app=express();


//Port
require('dotenv').config();
const PORT=process.env.PORT||4000;

//db connection
const connectDB=require("./config/db");
connectDB();

//middleware
const cors = require('cors');

app.use(cors({
  origin: ["https://ecommerce-web-frontend-5n9p.onrender.com"], // Replace with your deployed frontend URL
  credentials: true,
}));
app.use(express.json());//Parses JSON request bodies automatically
const morgan=require('morgan');//Logs requests to the console for easier debugging during development
app.use(morgan('dev'));

//routes
const authRoutes=require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);
const categoryRoutes=require('./routes/categoryRoutes')
app.use("/api/v1/category", categoryRoutes);
const productRoutes=require('./routes/productRoutes')
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Ecommerce Website</h1>")
});

//run listen
app.listen(PORT,()=>{
    console.log(`App is running on port:${PORT}`);
});
