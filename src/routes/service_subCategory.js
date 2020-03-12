var express = require('express');
var router = express.Router();
const multer = require('multer'); // uploading files to server and save database

const serviceSubCategoryController = require('../controllers').serviceSubCategory;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

const fileUpload = require('../middleware/fileupload'); // Retrieve file upload js
const upload = multer({
    storage: fileUpload.storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //Only allown filesize upto 10 MB.
    },
    // fileFilter: fileUpload.fileFilter
});

router.route('/serviceSubCategory')
      .get(serviceSubCategoryController.GetAllServiceSubCategoryList)
      .post(checkAuth, upload.single('service_image'), serviceSubCategoryController.CreateNewServiceSubCategory)

router.route('/serviceSubCategory/:id')
      .get(serviceSubCategoryController.GetServiceSubCategoryById)
      .put(checkAuth, upload.single('service_image'), serviceSubCategoryController.UpdateServiceSubCategoryById)


module.exports = router;
