import express from "express";
import PostRoute from "../controllers/postController.js";
const router = express.Router();

// POST /post -> handled as POST / (mounted at /post in server.js)
router.post("/", PostRoute);

export default router;