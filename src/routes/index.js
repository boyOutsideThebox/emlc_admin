var express = require('express');
var router = express.Router();

router.route('/')
      .get(function(req, res, next) {
          res.status(200).send({
              message: 'Express done here!',
          })
      });


module.exports = router;
