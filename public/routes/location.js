var express = require('express');
var router = express.Router();

const locationController = require('../controllers').location;
const checkAuth = require('../middleware/check-auth'); // User Authentication checking

router.route('/location')
      .get(locationController.GetAllLocationsList)
      .post(checkAuth, locationController.CreateNewLocation)

router.route('/location/:id')
      .get(locationController.GetLocationById)
      .put(checkAuth, locationController.UpdateLocationById)


module.exports = router;
