const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const Users = require('../models').hs_users;

exports.GetAllUsersList = (req, res, next) => {
  return Users
    .findAll({
      // attributes: ['UserId', 'name', 'email', 'Name', 'IsSuperAdmin', 'HasAdminPrivilege', 'IsActive', ],
      // order: [
      //   ['createdAt', 'DESC'],
      // ],
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send({
        message: 'Users Found',
        data: user
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.UserSignUp = (req, res, next) => {
  var pEmail = req.body.email;
  Users.findAll({
      where: {
        email: pEmail
      }
    })
    .then(user => {
      if (user.length >= 1) {
        // console.log(user[0].dataValues)
        return res.status(409).json({
          message: 'Email already exists',
          data: {
            userId: user[0].dataValues.UserId,
            name: user[0].dataValues.name,
            email: user[0].dataValues.email,
            role: user[0].dataValues.role,
            active: user[0].dataValues.IsActive
          }
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            Users.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                name: req.body.name,
                email: pEmail,
                password: hash,
                IsSuperAdmin: req.body.IsSuperAdmin,
                HasAdminPrivilege: req.body.HasAdminPrivilege,
                createdBy: req.body.createdBy,
                role: req.body.role,
                IsActive: req.body.IsActive,
                company_id: req.body.company_id
              })
              .then(result => {
                // console.log(result);
                res.status(201).json({
                  message: 'User Created Successfully',
                  data: result
                });
              })
              .catch((error) => res.status(400).send(error));
          }
        });
      }
    });
};

exports.UserSignIn = (req, res, next) => {
  var pEmail = req.body.email;
  var pPassword = req.body.password;
  var pRole = req.body.role
  Users.findAll({
      where: {
        email: pEmail,
        role: pRole,
        IsActive: true
      }
    })
    .then(user => {
      if (user.length < 1) {
        res.status(404).json({
          message: 'The username and password you entered do not match any accounts on record.'
        });
      } else {
        bcrypt.compare(pPassword, user[0].dataValues.password, (err, result) => {
          if (result) {
            const token = jwt.sign({
                email: user[0].dataValues.email,
                userId: user[0].dataValues.UserId,
                role: user[0].dataValues.role
              },
              process.env.JWT_KEY, {
                expiresIn: "1h"
              }
            );
            res.status(200).json({
              message: 'Login successful',
              data:  {user: user[0], token: token}
            });
          } else {
            res.status(403).json({
              message: 'Login failed'
            });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.GetUserById = (req, res, next) => {
  // console.log("UserId: " + req.params.UserId);
  return Users
    .findByPk(req.params.UserId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'user Not Found',
        });
      }
      return res.status(200).send({
        message: 'user Found',
        data: user
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.UpdateUserById = (req, res, next) => {
  // console.log(req.params.UserId);
  return Users
    .findByPk(req.params.UserId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      // console.log(req.body.IsActive)
      return user
        .update({
          name: req.body.name,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          official_mail: req.body.official_mail,
          transaction_mail: req.body.transaction_mail,
          address: req.body.address,
          primary_contact: req.body.primary_contact,
          secondary_contact: req.body.secondary_contact,
          IsSuperAdmin: req.body.IsSuperAdmin,
          HasAdminPrivilege: req.body.HasAdminPrivilege,
          IsActive: req.body.IsActive,
        })
        .then((uUser) => res.status(200).send({
          message: 'User Updated Successfully',
          data: uUser
        }))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

exports.ChangeProfileById = (req, res, next) => {
  // console.log(req.params.UserId);
  return Users
    .findByPk(req.params.UserId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'user Not Found',
        });
      }
      if (req.file) {
        return user
            .update({
              user_image: req.file.path,
            })
            .then((uUser) => res.status(200).send({
              message: 'Image Updated Successfully',
              data: uUser
            }))
            .catch((error) => res.status(400).send(error));
      } else {
        return res.status(404).send({
          message: 'Select Proper Image',
        });
      }
      
    })
    .catch((error) => res.status(400).send(error));
};

exports.ChangePasswordById = (req, res, next) => {
  var old_password = req.body.old_password;
  var new_password = req.body.new_password;
  return Users
    .findByPk(req.params.UserId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'user Not Found',
        });
      } else {
        // console.log(user.dataValues)
        bcrypt.compare(old_password, user.dataValues.password, (err, result) => {
          if (result) {
            // console.log("result", result)
              bcrypt.hash(new_password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error: err
                  });
                } else {
                  return user
                      .update({
                        password: hash,
                      })
                      .then((uUser) => res.status(200).send({
                        message: 'Password Updated Successfully',
                        data: uUser
                      }))
                      .catch((error) => res.status(400).send(error));
                }
              });
          } else {
            res.status(403).json({
              message: 'Invalid credentials'
            });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.UsernameEmailCheck = (req, res, next) => {
  var pEmail = req.params.email;
  Users.findAll({
      where: {
        email: pEmail
      }
    })
    .then(user => {
      if (user.length >= 1) {
        // console.log(user[0].dataValues)
        return res.status(409).json({
          message: 'Email already exists',
          data: {
            userId: user[0].dataValues.UserId,
            name: user[0].dataValues.name,
            email: user[0].dataValues.email,
            role: user[0].dataValues.role,
            active: user[0].dataValues.IsActive
          }
        });
      } else {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
    });
};