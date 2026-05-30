const Blog = require('../models/Blog');

// Fetch all active blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching insights", error });
  }
};

// Create a new corporate blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, category, author, content } = req.body;
    const newBlog = new Blog({ title, category, author, content });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: "Failed to create data record", error });
  }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Insight node successfully purged" });
  } catch (error) {
    res.status(400).json({ message: "Deletion mapping execution failed", error });
  }
};