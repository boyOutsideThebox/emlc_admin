var express = require('express');
var router = express.Router();
const multer = require('multer'); // uploading files to server and save database

const usersController = require('../controllers').users;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

const fileUpload = require('../middleware/fileupload'); // Retrieve file upload js
const upload = multer({
    storage: fileUpload.storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //Only allown filesize upto 10 MB.
    },
    // fileFilter: fileUpload.fileFilter
});


router.route('/users')
      .all(checkAuth)
      .get(usersController.GetAllUsersList)

router.route('/signup')
    .post(usersController.UserSignUp)

router.route('/login')
    .post(usersController.UserSignIn)

router.route('/users/:UserId')
      .all(checkAuth)
      .get(usersController.GetUserById)
      .put(usersController.UpdateUserById)

router.route('/users/ChangeProfile/:UserId')
      .put(checkAuth, upload.single('user_image'), usersController.ChangeProfileById)

router.route('/users/ChangePassword/:UserId')
      .put(checkAuth, usersController.ChangePasswordById)

router.route('/users/UsernameEmailCheck/:email')
      .get(checkAuth, usersController.UsernameEmailCheck)


module.exports = router;
