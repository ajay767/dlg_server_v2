const router = require("express").Router();
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");
router.post("/create-blog", authController.protect, blogController.createBlog);
router.get("/get-all-blogs", blogController.getAllBlog);
router.get("/get-blog/:id", blogController.getBlog);
router.patch("/update-blog/:id", blogController.updateBlog);
router.delete("/delete-blog/:id", blogController.deleteBlog);

module.exports = router;
