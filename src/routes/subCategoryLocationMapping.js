var express = require('express');
var router = express.Router();

const subCategoryLocationController = require('../controllers').subCategoryLocation;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

router.route('/subCategoryLocation')
      .get(subCategoryLocationController.GetAllsubCategoryLocationList)
      .post(checkAuth, subCategoryLocationController.CreatesubCategoryLocation)

router.route('/subCategoryLocation/:sub_cat_id')
      .get(subCategoryLocationController.GetsubCategoryLocationBySubCatId)
    //   .put(checkAuth, subCategoryLocationController.UpdatesubCategoryLocationBySubCatId)
      .delete(checkAuth, subCategoryLocationController.DeletesubCategoryLocationBySubCatId)


module.exports = router;
