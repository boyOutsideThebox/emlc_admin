var express = require('express');
var router = express.Router();
const multer = require('multer'); // uploading files to server and save database

const serviceCategoryController = require('../controllers').serviceCategory;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

const fileUpload = require('../middleware/fileupload'); // Retrieve file upload js
const upload = multer({
    storage: fileUpload.storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //Only allown filesize upto 10 MB.
    },
    // fileFilter: fileUpload.fileFilter
});


router.route('/serviceCategory')
      .get(serviceCategoryController.GetAllServiceCategoryList)
      .post(checkAuth, upload.single('image'), serviceCategoryController.CreateNewServiceCategory)

router.route('/serviceCategory/:id')
      .get(serviceCategoryController.GetServiceCategoryById)
      .put(checkAuth, upload.single('image'), serviceCategoryController.UpdateServiceCategoryById)


module.exports = router;
