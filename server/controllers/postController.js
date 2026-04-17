import Post from "../src/models/PostSchema.js";

const PostRoute = async (req, res) => {
  try {
    const { title, content, coverImage } = req.body;

    // if (!req.user || !req.user._id) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    const newPost = await Post.create({
      title,
      content,
      coverImage: coverImage || null,
      author: '69c3a187e4f3d4143c31a501',
    });

    return res
      .status(201)
      .json({ message: "Post created successfully", data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

export default PostRoute;
