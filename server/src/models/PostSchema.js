import mongoose from "mongoose";
const post_Schema=new mongoose.Schema({
      title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  coverImage: {
  type: String,
  default: null
}
})

const Post=mongoose.model("Post",post_Schema)
export default Post