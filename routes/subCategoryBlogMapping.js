var express = require('express');
var router = express.Router();

const subCategoryBlogController = require('../controllers').subCategoryBlog;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

router.route('/subCategoryBlog')
      .get(subCategoryBlogController.GetAllsubCategoryBlogList)
      .post(checkAuth, subCategoryBlogController.CreatesubCategoryBlog)

router.route('/subCategoryBlog/:sub_cat_id')
      .get(subCategoryBlogController.GetsubCategoryBlogBySubCatId)
    //   .put(checkAuth, subCategoryBlogController.UpdatesubCategoryBlogBySubCatId)
      .delete(checkAuth, subCategoryBlogController.DeletesubCategoryBlogBySubCatId)


module.exports = router;
