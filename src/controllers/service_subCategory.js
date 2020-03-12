const serviceSubCategory = require('../models').hs_service_sub_categories;
const serviceCategory = require('../models').hs_service_categories;

exports.GetAllServiceSubCategoryList = (req, res, next) => {
  return serviceSubCategory
    .findAll({
      attributes: ['id', 'name', 'service_image', 'service_url', 'ser_cat_id','total_cost','recommended', 'IsActive', 'updatedAt'],
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [{ model: serviceCategory, as: 'servicecategory' ,
                  attributes: ['id', 'name', 'IsActive', 'updatedAt']
                }
              ]
    })
    .then((servicesubcate) => {
      if (!servicesubcate) {
        return res.status(404).send({
          message: 'Service Sub Category Not Found',
        });
      }
      return res.status(200).send({
        message: 'Service Sub Category Found',
        data: servicesubcate
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.GetServiceSubCategoryById = (req, res, next) => {
  return serviceSubCategory
    .findByPk(req.params.id)
    .then((servicesubcate) => {
      if (!servicesubcate) {
        return res.status(404).send({
          message: 'Service Sub Category Not Found',
        });
      }
      return res.status(200).send({
        message: 'Service Sub Category Found',
        data: servicesubcate
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.CreateNewServiceSubCategory= (req, res, next) => {
  var pName = req.body.name;
  serviceSubCategory.findAll({
      where: {
        name: pName
      }
    })
    .then(servicesubcate => {
      if (servicesubcate.length >= 1) {
        return res.status(200).json({
          message: 'Service Sub Category already exists',
          data: {
            id: servicesubcate[0].dataValues.id,
            name: servicesubcate[0].dataValues.name,
            active: servicesubcate[0].dataValues.IsActive
          }
        });
      } else {
        var createData = {};
        if (req.file) {
          createData = {
            name: req.body.name,
            description: req.body.description,
            service_image: req.file.path,
            ser_cat_id: req.body.ser_cat_id,
            service_url: req.body.service_url,
            service_meta_titel: req.body.service_meta_titel,
            service_meta_keyword: req.body.service_meta_keyword,
            service_meta_desc: req.body.service_meta_desc,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
            base_price: req.body.base_price,
            service_charge: req.body.service_charge,
            others_charge: req.body.others_charge,
            total_cost: req.body.total_cost,
            discount: req.body.discount,
            recommended: req.body.recommended,
          };
        } else {
          createData = {
            name: req.body.name,
            description: req.body.description,
            ser_cat_id: req.body.ser_cat_id,
            service_url: req.body.service_url,
            service_meta_titel: req.body.service_meta_titel,
            service_meta_keyword: req.body.service_meta_keyword,
            service_meta_desc: req.body.service_meta_desc,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
            base_price: req.body.base_price,
            service_charge: req.body.service_charge,
            others_charge: req.body.others_charge,
            total_cost: req.body.total_cost,
            discount: req.body.discount,
            recommended: req.body.recommended,
          };
        }
        serviceSubCategory.create(createData)
          .then(result => {
            // console.log(result);
            res.status(201).json({
              message: 'Service Sub Category Created Successfully',
              data: result
            });
          })
          .catch((error) => res.status(400).send(error));
      }
    });
};

exports.UpdateServiceSubCategoryById = (req, res, next) => {
  console.log(req.body)
  return serviceSubCategory
    .findByPk(req.params.id)
    .then(servicesubcate => {
      if (!servicesubcate) {
        return res.status(404).send({
          message: 'Service Sub Category Not Found',
        });
      }
      var updateData = {};
      if (req.file) {
        updateData = {
          name: req.body.name,
          description: req.body.description,
          service_image: req.file.path,
          ser_cat_id: req.body.ser_cat_id,
          service_url: req.body.service_url,
          service_meta_titel: req.body.service_meta_titel,
          service_meta_keyword: req.body.service_meta_keyword,
          service_meta_desc: req.body.service_meta_desc,
          updatedBy: req.body.updatedBy,
          IsActive: req.body.IsActive,
          base_price: req.body.base_price,
          service_charge: req.body.service_charge,
          others_charge: req.body.others_charge,
          total_cost: req.body.total_cost,
          discount: req.body.discount,
          recommended: req.body.recommended,
        };
      } else {
        updateData = {
          name: req.body.name,
          description: req.body.description,
          ser_cat_id: req.body.ser_cat_id,
          service_url: req.body.service_url,
          service_meta_titel: req.body.service_meta_titel,
          service_meta_keyword: req.body.service_meta_keyword,
          service_meta_desc: req.body.service_meta_desc,
          updatedBy: req.body.updatedBy,
          IsActive: req.body.IsActive,
          base_price: req.body.base_price,
          service_charge: req.body.service_charge,
          others_charge: req.body.others_charge,
          total_cost: req.body.total_cost,
          discount: req.body.discount,
          recommended: req.body.recommended,
        };
      }
      return servicesubcate
        .update(updateData)
        .then((uServicesubcate) => res.status(200).send({
          message: 'Service Sub Category Updated Successfully',
          data: uServicesubcate
        }))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

