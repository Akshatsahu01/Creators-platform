import Post from "../src/models/PostSchema.js";

export const PostRoute = async (req, res) => {
  try {
    const { title, content, coverImage } = req.body;

    // if (!req.user || !req.user._id) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    const newPost = await Post.create({
      title,
      content,
      coverImage: coverImage || null,
      // author: req.user._id,
      author: "69c3a187e4f3d4143c31a501",
    });

    return res
      .status(201)
      .json({ message: "Post created successfully", data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return res
      .status(500)
      .json({
        message:
          error.message || "Something went wrong {message: error.message}",
      });
  }
};

// Return all posts (or a single post if id query provided)
export const Getpost = async (req, res) => {
  try {
    // If an id is provided as query param, return single post
    const { id } = req.query;
    const token=req.headers.Authorization
    console.log("Here is your token ",token)

    if (id) {
      const post = await Post.find({author:id}).populate("author");
      if (!post) return res.status(404).json({ message: "Post not found" });
      return res.status(200).json({ data: post });
    }
  
  } catch (error) {
    console.error("Getpost error:", error);
    return res.status(500).json({ error: error.message || error });
  }
};
