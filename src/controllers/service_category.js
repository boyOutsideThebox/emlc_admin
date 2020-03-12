const db = require('../models');
const serviceCategory = require('../models').hs_service_categories;

exports.GetAllServiceCategoryList = (req, res, next) => {
  return serviceCategory
    .findAll({
      attributes: ['id', 'name','image','in_home_page', 'cate_url','updatedAt','IsActive'],
      order: [
        ['createdAt', 'DESC'],
      ],
    })
    .then((servicecate) => {
      if (!servicecate) {
        return res.status(404).send({
          message: 'Service Category Not Found',
        });
      }
      return res.status(200).send({
        message: 'Service Category Found',
        data: servicecate
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.GetServiceCategoryById = (req, res, next) => {
  return serviceCategory
    .findByPk(req.params.id)
    .then((servicecate) => {
      if (!servicecate) {
        return res.status(404).send({
          message: 'Service Category Not Found',
        });
      }
      return res.status(200).send({
        message: 'Service Category Found',
        data: servicecate
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.CreateNewServiceCategory= (req, res, next) => {
  var pName = req.body.name;
  serviceCategory.findAll({
      where: {
        name: pName
      }
    })
    .then(servicecate => {
      if (servicecate.length >= 1) {
        return res.status(200).json({
          message: 'Service Category already exists',
          data: {
            id: servicecate[0].dataValues.id,
            name: servicecate[0].dataValues.name,
            active: servicecate[0].dataValues.IsActive
          }
        });
      } else {
        var createData = {};
        if (req.file) {
            createData = {
              name: req.body.name,
              description: req.body.description,
              image: req.file.path,
              cate_url: req.body.cate_url,
              cate_meta_titel: req.body.cate_meta_titel,
              cate_meta_keyword: req.body.cate_meta_keyword,
              cate_meta_desc: req.body.cate_meta_desc,
              createdBy: req.body.createdBy,
              updatedBy: req.body.updatedBy,
              IsActive: req.body.IsActive,
            };
        } else {
          createData = {
            name: req.body.name,
            description: req.body.description,
            cate_url: req.body.cate_url,
            cate_meta_titel: req.body.cate_meta_titel,
            cate_meta_keyword: req.body.cate_meta_keyword,
            cate_meta_desc: req.body.cate_meta_desc,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
          };
        }
        serviceCategory.create(createData)
          .then(result => {
            // console.log(result);
            res.status(201).json({
              message: 'Service Category Created Successfully',
              data: result
            });
          })
          .catch((error) => res.status(400).send(error));
      }
    });
};

exports.UpdateServiceCategoryById = async (req, res, next) => {
  // console.log("Files", req.file);
  var result = await db.sequelize.query("SELECT COUNT(in_home_page) in_home_page FROM hs_service_categories WHERE in_home_page = 'Y' ");
  var inHomeCount = result[0][0].in_home_page;
  if (req.body.in_home_page == 'Y' && inHomeCount >= 4 ) {
    return res.status(400).json({
      message: 'Can\'t modify. Already 4 Catgories have been selected for Home Page display.',
    });
  } else {
    return serviceCategory
      .findByPk(req.params.id)
      .then(servicecate => {
        if (!servicecate) {
          return res.status(404).send({
            message: 'Service Category Not Found',
          });
        }
        var updateData = {};
        if (req.file) {
          updateData = {
            name: req.body.name,
            description: req.body.description,
            image: req.file.path,
            in_home_page: req.body.in_home_page,
            cate_url: req.body.cate_url,
            cate_meta_titel: req.body.cate_meta_titel,
            cate_meta_keyword: req.body.cate_meta_keyword,
            cate_meta_desc: req.body.cate_meta_desc,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
          };
        } else {
          updateData = {
            name: req.body.name,
            description: req.body.description,
            in_home_page: req.body.in_home_page,
            cate_url: req.body.cate_url,
            cate_meta_titel: req.body.cate_meta_titel,
            cate_meta_keyword: req.body.cate_meta_keyword,
            cate_meta_desc: req.body.cate_meta_desc,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
          };
        }
        return servicecate
          .update(updateData)
          .then((uServicecate) => res.status(200).json({
            message: 'Service Category Updated Successfully',
            data: uServicecate
          }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};

