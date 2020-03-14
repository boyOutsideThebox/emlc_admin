const Blog = require('../models').hs_blog;

exports.GetAllBlogList = (req, res, next) => {
  return Blog
    .findAll({
      attributes: ['id', 'blog_title', 'blog_url', 'coverr_img', 'IsActive', 'updatedAt'],
      order: [
        ['createdAt', 'DESC'],
      ],
    })
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: 'Blog Not Found',
        });
      }
      return res.status(200).send({
        message: 'Blog Found',
        data: blog
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.GetBlogById = (req, res, next) => {
  return Blog
    .findByPk(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: 'Blog Not Found',
        });
      }
      return res.status(200).send({
        message: 'Blog Found',
        data: blog
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.CreateNewBlog = (req, res, next) => {
  var pblog_title = req.body.blog_title;
  Blog.findAll({
      where: {
        blog_title: pblog_title
      }
    })
    .then(blog => {
      if (blog.length >= 1) {
        return res.status(200).json({
          message: 'Blog already exists',
          data: {
            id: blog[0].dataValues.id,
            title: blog[0].dataValues.blog_title,
            active: blog[0].dataValues.IsActive
          }
        });
      } else {
        var createData = {};
        if (req.file) {
          createData = {
            blog_title: req.body.blog_title,
            blog_url: req.body.blog_url,
            blog_desc: req.body.blog_desc,
            coverr_img: req.file.path,
            meta_titel: req.body.meta_titel,
            meta_desc: req.body.meta_desc,
            meta_key: req.body.meta_key,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
          };
        } else {
          createData = {
            blog_title: req.body.blog_title,
            blog_url: req.body.blog_url,
            blog_desc: req.body.blog_desc,
            meta_titel: req.body.meta_titel,
            meta_desc: req.body.meta_desc,
            meta_key: req.body.meta_key,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            IsActive: req.body.IsActive,
          };
        }
        Blog.create(createData)
          .then(result => {
            // console.log(result);
            res.status(201).json({
              message: 'Blog Created Successfully',
              data: result
            });
          })
          .catch((error) => res.status(400).send(error));
      }
    });
};

exports.UpdateBlogById = (req, res, next) => {
  return Blog
    .findByPk(req.params.id)
    .then(blog => {
      if (!blog) {
        return res.status(404).send({
          message: 'Blog Not Found',
        });
      }
      var updateData = {};
      if (req.file) {
        updateData = {
          blog_title: req.body.blog_title,
          blog_url: req.body.blog_url,
          blog_desc: req.body.blog_desc,
          coverr_img: req.file.path,
          meta_titel: req.body.meta_titel,
          meta_desc: req.body.meta_desc,
          meta_key: req.body.meta_key,
          updatedBy: req.body.updatedBy,
          IsActive: req.body.IsActive,
        };
      } else {
        updateData = {
          blog_title: req.body.blog_title,
          blog_url: req.body.blog_url,
          blog_desc: req.body.blog_desc,
          meta_titel: req.body.meta_titel,
          meta_desc: req.body.meta_desc,
          meta_key: req.body.meta_key,
          updatedBy: req.body.updatedBy,
          IsActive: req.body.IsActive,
        };
      }
      return blog
        .update(updateData)
        .then((ublog) => res.status(200).send({
          message: 'Blog Updated Successfully',
          data: ublog
        }))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

