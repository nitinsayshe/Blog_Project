const express = require('express');
const router = express.Router();
const authorController =require("../controller/authorController")
const blogController =require("../controller/blogController")


// Api to Create Author
router.post("/authors",authorController.createAuthors)

//Api to Create Blogs
router.post("/blogs",blogController.createBlogs)

//Api to get Blogs
router.get("/blogs",blogController.getBlogs)

//Api to update blog as per blogId
router.put("/blogs/:blogId",blogController.updateBlogs)

//Api to delete blog
router.delete("/blogs/:blogId",blogController.deletedBlog)

//Api to delete the blog as per query
router.delete("/blogs",blogController.deleteBlogWithQuery)














module.exports = router;