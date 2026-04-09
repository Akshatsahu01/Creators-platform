import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './src/models/UserSchema.js';
import mongoose from 'mongoose';
import authrouter from './routes/authRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from "jsonwebtoken"
import uploadRoutes from "./routes/upload.js"

// Load environment variables
// dotenv.config();
dotenv.config({ path: "./server/.env" });

const app = express();
const httpServer = createServer(app); ///for websocket
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true,
}));

const io = new Server(httpServer, {  ////for websocket
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
const connectdb=async ()=>{
  await mongoose.connect("mongodb+srv://Akshat:Akshat@cluster01.tidcpbg.mongodb.net/Creators-platform?appName=Cluster01")
  console.log("Connected to mongodb")
}
app.use(express.json());

connectdb();

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication error: No token provided'));
  }

  // Verify the token here using jwt.verify()
  // If valid: call next()
  // If invalid: call next(new Error('Authentication error'))
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    socket.data.user=decoded
    next()
  }catch(error){
    next(new Error('Authentication error'))
  }



});

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
app.use('/api/upload',uploadRoutes)

// app.post("/api/auth/login",async (req,res)=>{
//   console.log(req.body)
//   console.log("Hello")
//   res.status(200).json({message:"I am checking what on going here"})
// })

// Start server

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id} || user: ${JSON.stringify(socket.data.user.email)}`);

  // Handle disconnection
  socket.on('disconnect', (reason) => {
    console.log(`❌ User disconnected: ${socket.id} (${reason})`);
  });
});


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// To this:
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.io ready for connections`);
});