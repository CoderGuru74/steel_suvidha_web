const Blog = require('../models/Blog');

// Fetch all active blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server Error fetching insights", error: error.message });
  }
};

// Create a new corporate blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, category, author, content } = req.body;

    if (!title || !author || !content) {
      return res.status(400).json({ 
        message: "Missing required fields: title, author, and content must be provided." 
      });
    }

    const newBlog = await Blog.create({
      title: title.trim(),
      category: category ? category.trim() : 'Market Trends',
      author: author.trim(),
      content: content.trim()
    });

    console.log("✅ Blog created successfully:", newBlog._id);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("❌ Failed to create blog record in MongoDB:", error);
    res.status(400).json({ 
      message: "Failed to create data record", 
      error: error.message || error 
    });
  }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Insight node successfully purged" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(400).json({ message: "Deletion mapping execution failed", error: error.message });
  }
};