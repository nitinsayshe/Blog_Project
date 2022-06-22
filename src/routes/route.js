const express = require('express');
const router = express.Router();
const authorController =require("../controller/authorController")
const blogController =require("../controller/blogController")


// Api to Create Author
router.post("/authors",authorController.createAuthors)

//Api to Create Blogs
router.post("/blogs",blogController.createBlogs)

router.get("/blogs",blogController.getBlogs)

router.put("/blogs/:blogId",blogController.updateBlogs)

router.delete("/blogs/:blogId",blogController.deletedBlog)

router.delete("/blogs",blogController.deleteBlogWithQuery)














module.exports = router;