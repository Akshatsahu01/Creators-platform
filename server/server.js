import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './src/models/UserSchema.js';
import mongoose from 'mongoose';
import authrouter from './routes/authRoutes.js';


// Load environment variables
dotenv.config();
dotenv.config({ path: "./server/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true,
}));
const connectdb=async ()=>{
  await mongoose.connect("mongodb+srv://Akshat:Akshat@cluster01.tidcpbg.mongodb.net/Creators-platform?appName=Cluster01")
  console.log("Connected to mongodb")
}
app.use(express.json());

connectdb();

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});
app.use("/api/auth",authrouter)
app.post('/api/users/register',async (req,res)=>{
    try{
      const {name,email,password}= req.body;
      const savadata=await User.create({name,email,password})
      res.status(201).json({
        "Status":"Sucess",
        "data":savadata
      })
    }catch (error) {
    console.log("error ", error);

    return res.status(500).json({
      message: error.message || "Something went wrong"
    });
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});