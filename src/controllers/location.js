const Location = require('../models').hs_location;

exports.GetAllLocationsList = (req, res, next) => {
  return Location
    .findAll({
      attributes: ['id', 'name', 'latitude', 'longitude','IsActive','updatedAt'],
      order: [
        ['createdAt', 'DESC'],
      ],
    })
    .then((location) => {
      if (!location) {
        return res.status(404).send({
          message: 'Location Not Found',
        });
      }
      return res.status(200).send({
        message: 'Location Found',
        data: location
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.GetLocationById = (req, res, next) => {
  return Location
    .findByPk(req.params.id)
    .then((location) => {
      if (!location) {
        return res.status(404).send({
          message: 'Location Not Found',
        });
      }
      return res.status(200).send({
        message: 'Location Found',
        data: location
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.CreateNewLocation = (req, res, next) => {
  var pName = req.body.name;
  Location.findAll({
      where: {
        name: pName
      }
    })
    .then(location => {
      if (location.length >= 1) {
        return res.status(200).json({
          message: 'Location already exists',
          data: {
            id: location[0].dataValues.id,
            name: location[0].dataValues.name,
            active: location[0].dataValues.IsActive
          }
        });
      } else {
        Location.create({
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
          })
          .then(result => {
            // console.log(result);
            res.status(201).json({
              message: 'Location Created Successfully',
              data: result
            });
          })
          .catch((error) => res.status(400).send(error));
      }
    });
};

exports.UpdateLocationById = (req, res, next) => {
  return Location
    .findByPk(req.params.id)
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: 'Location Not Found',
        });
      }
      return location
        .update({
          name: req.body.name,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          updatedBy: req.body.updatedBy,
          IsActive: req.body.IsActive,
        })
        .then((ulocation) => res.status(200).send({
          message: 'Location Updated Successfully',
          data: ulocation
        }))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

