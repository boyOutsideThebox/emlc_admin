const axios = require('axios');

const Company = require('../models').hs_company;
const Users = require('../models').hs_users;

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

exports.GetAllCompanyList = (req, res, next) => {
  return Company
    .findAll({
      attributes: ['id', 'name','sub_heading','is_verified', 'address', 'contact_no', 'email', 'updatedBy', 'updatedAt', 'IsActive'],
      order: [
        ['createdAt', 'DESC'],
      ],
    })
    .then((company) => {
      if (!company) {
        return res.status(404).send({
          message: 'Company Not Found',
        });
      }
      return res.status(200).send({
        message: 'Company Found',
        data: company
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.GetCompanyById = (req, res, next) => {
  return Users
    .findAll({
      where: {
        company_id: req.params.id
      },
      attributes: ['name', 'first_name', 'last_name','email'],
      include: [{ model: Company, as: 'usercompany' ,
                  // attributes: ['id', 'name', 'IsActive', 'updatedAt']
            }]
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Company Not Found',
        });
      }
      return res.status(200).send({
        message: 'Company Found',
        data: user
      });
    })
    .catch((error) => res.status(400).send(error));

};

exports.CreateNewCompany = (req, res, next) => {
  var pName = req.body.name;
  // console.log(req.files[0].path)
  Company.findAll({
      where: {
        name: pName
      }
    })
    .then(company => {
      if (company.length >= 1) {
        return res.status(200).json({
          message: 'Company already exists',
          data: {
            id: company[0].dataValues.id,
            name: company[0].dataValues.name,
            active: company[0].dataValues.IsActive
          }
        });
      } else {
        var createData = {};
        if (isEmptyObject(req.files)) {
          createData = {
            name: req.body.name,
            sub_heading: req.body.sub_heading,
            about: req.body.about,
            is_verified: req.body.is_verified,
            address: req.body.address,
            contact_no: req.body.contact_no,
            email: req.body.email,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
            trade_licence_no: req.body.trade_licence_no,
            other_doc_name: req.body.other_doc_name,
            pan_no: req.body.pan_no,
          };
        } else {
          createData = {
            name: req.body.name,
            sub_heading: req.body.sub_heading,
            about: req.body.about,
            is_verified: req.body.is_verified,
            address: req.body.address,
            contact_no: req.body.contact_no,
            email: req.body.email,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
            trade_licence_no: req.body.trade_licence_no,
            other_doc_name: req.body.other_doc_name,
            pan_no: req.body.pan_no,
          };

          if (req.files.length == 1 && req.files[0].fieldname == 'trade_licence_doc') {
            createData['trade_licence_doc'] = req.files[0].path;
          } else if (req.files.length == 1 && req.files[0].fieldname == 'other_document') {
            createData['other_document'] = req.files[0].path;
          } else {
            createData['trade_licence_doc'] = req.files[0].path;
            createData['other_document'] = req.files[1].path;
          }
        }
        Company.create(createData)
          .then(async (result) => {
            // console.log(result);
            var companySignData = {
              first_name: req.body.owner_first_name,
              last_name: req.body.owner_last_name,
              name: req.body.name,
              email: req.body.owner_email,
              password: req.body.password,
              IsSuperAdmin: false,
              HasAdminPrivilege: false,
              role: 'vendor',
              IsActive: true,
              company_id: result.dataValues.id
            };
            try {
              const token = req.headers.authorization.split(" ")[1];
              const response = await axios.post('http://localhost:3000/api/signup', 
                              companySignData,
                              { headers: { Authorization: `Bearer ${token}` } }
                            );
              if (response.status === 201) {
                res.status(201).json({
                  message: 'Company Created Successfully',
                  data: result
                });
              } else {
                  return res.status(400).json({
                    message: response.data,
                  });
              }
            } catch (error) {
              return res.status(400).json({
                message: error.response.data,
              });
            }
          })
          .catch((error) => res.status(400).send(error));
      }
    });
};

exports.UpdateCompanyById = (req, res, next) => {
  return Company
    .findByPk(req.params.id)
    .then((company) => {
      if (!company) {
        return res.status(404).send({
          message: 'Company Not Found',
        });
      }
      // console.log("req.files", req.files)
      var updateData = {};
      if (isEmptyObject(req.files)) {
        updateData = {
          name: req.body.name,
          sub_heading: req.body.sub_heading,
          about: req.body.about,
          is_verified: req.body.is_verified,
          address: req.body.address,
          contact_no: req.body.contact_no,
          email: req.body.email,
          createdBy: req.body.createdBy,
          updatedBy: req.body.updatedBy,
          IsActive: req.body.IsActive,
          trade_licence_no: req.body.trade_licence_no,
          other_doc_name: req.body.other_doc_name,
          pan_no: req.body.pan_no,
        };
      } else {
        updateData = {
          name: req.body.name,
          sub_heading: req.body.sub_heading,
          about: req.body.about,
          is_verified: req.body.is_verified,
          address: req.body.address,
          contact_no: req.body.contact_no,
          email: req.body.email,
          createdBy: req.body.createdBy,
          updatedBy: req.body.updatedBy,
          IsActive: req.body.IsActive,
          trade_licence_no: req.body.trade_licence_no,
          other_doc_name: req.body.other_doc_name,
          pan_no: req.body.pan_no,
        };

        if (req.files.length == 1 && req.files[0].fieldname == 'trade_licence_doc') {
          updateData['trade_licence_doc'] = req.files[0].path;
        } else if (req.files.length == 1 && req.files[0].fieldname == 'other_document') {
          updateData['other_document'] = req.files[0].path;
        } else {
          updateData['trade_licence_doc'] = req.files[0].path;
          updateData['other_document'] = req.files[1].path;
        }
      }
      // console.log("updateData",updateData)
      return company
        .update(updateData)
        .then((ucompany) => {
          var userUpdateData = {
            first_name: req.body.owner_first_name,
            last_name: req.body.owner_last_name,
            name: req.body.name
          };
          return Users
          .update(userUpdateData, { where: { company_id: req.params.id } })
          .then((uUser) => res.status(200).send({
            message: 'Company Updated Successfully',
            data: ucompany
          }))
          .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

exports.EmailCheck = (req, res, next) => {
  var pEmail = req.params.email;
  Company.findAll({
      where: {
        email: pEmail
      }
    })
    .then(company => {
      if (company.length >= 1) {
        // console.log(company[0].dataValues)
        return res.status(409).json({
          message: 'Email already exists',
          data: {
            Id: company[0].dataValues.id,
            name: company[0].dataValues.name,
            email: company[0].dataValues.email,
            active: company[0].dataValues.IsActive
          }
        });
      } else {
        return res.status(404).send({
          message: 'Email does\'t exist',
        });
      }
    });
};
