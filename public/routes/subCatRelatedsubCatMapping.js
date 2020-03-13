var express = require('express');
var router = express.Router();

const subCatRelatedsubCatController = require('../controllers').subCatRelatedsubCat;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

router.route('/subCategoryRelatedsubCategory')
      .get(subCatRelatedsubCatController.GetAllsubCatRltdsubCatList)
      .post(checkAuth, subCatRelatedsubCatController.CreatesubCatRltdsubCat)

router.route('/subCategoryRelatedsubCategory/:sub_cat_id')
      .get(subCatRelatedsubCatController.GetsubCatRltdsubCatBySubCatId)
    //   .put(checkAuth, subCatRelatedsubCatController.UpdatesubCatRltdsubCatBySubCatId)
      .delete(checkAuth, subCatRelatedsubCatController.DeletesubCatRltdsubCatBySubCatId)


module.exports = router;
