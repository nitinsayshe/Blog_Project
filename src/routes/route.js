const express = require('express');
const router = express.Router();
const authorController =require("../controller/authorController")
const blogController =require("../controller/blogController")



router.post("/authors",authorController.authors)

router.post("/blogs",blogController.blogs)

router.get("/blogs",blogController.getBlogs)

router.put("/blogs/:blogId",blogController.updateBlogs)














module.exports = router;