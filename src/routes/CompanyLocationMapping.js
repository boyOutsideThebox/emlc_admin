var express = require('express');
var router = express.Router();

const CompanyLocationController = require('../controllers').CompanyLocation;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

router.route('/CompanyLocation')
      .get(CompanyLocationController.GetAllCompanyLocationList)
      .post(checkAuth, CompanyLocationController.CreateCompanyLocation)

router.route('/CompanyLocation/:comp_id')
      .get(CompanyLocationController.GetCompanyLocationByCompId)
      // .put(checkAuth, CompanyLocationController.UpdateCompanyLocationByCompId)
      .delete(checkAuth, CompanyLocationController.DeleteCompanyLocationByCompId)


module.exports = router;
