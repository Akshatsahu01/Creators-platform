import express from "express";
import {PostRoute,Getpost} from "../controllers/postController.js";
const router = express.Router();

// POST /post -> handled as POST / (mounted at /post in server.js)
router.post("/", PostRoute);
router.get("/",Getpost)

export default router;