var express = require('express');
var router = express.Router();
const multer = require('multer'); // uploading files to server and save database

const companyController = require('../controllers').company;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

const fileUpload = require('../middleware/fileupload'); // Retrieve file upload js
const upload = multer({
      storage: fileUpload.storage,
      limits: {
            fileSize: 1024 * 1024 * 10 //Only allown filesize upto 10 MB.
      },
      // fileFilter: fileUpload.fileFilter
});

router.route('/company')
      .get(companyController.GetAllCompanyList)
      .post(checkAuth, upload.any(), companyController.CreateNewCompany)

router.route('/company/:id')
      .get(companyController.GetCompanyById)
      .put(checkAuth, upload.any(), companyController.UpdateCompanyById)

router.route('/company/EmailCheck/:email')
      .get(checkAuth, companyController.EmailCheck)


module.exports = router;
