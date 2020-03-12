var express = require('express');
var router = express.Router();
const multer = require('multer'); // uploading files to server and save database

const blogController = require('../controllers').blog;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

const fileUpload = require('../middleware/fileupload'); // Retrieve file upload js
const upload = multer({
    storage: fileUpload.storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //Only allown filesize upto 10 MB.
    },
    // fileFilter: fileUpload.fileFilter
});

router.route('/blog')
      .get(blogController.GetAllBlogList)
      .post(checkAuth, upload.single('coverr_img'), blogController.CreateNewBlog)

router.route('/blog/:id')
      .get(blogController.GetBlogById)
      .put(checkAuth, upload.single('coverr_img'), blogController.UpdateBlogById)


module.exports = router;
