const users = require('./users');
const location = require('./location');
const serviceCategory = require('./service_category');
const serviceSubCategory = require('./service_subCategory');
const company = require('./company');
const blog = require('./blog');
const CompanyLocation = require('./CompanyLocationMapping');
const subCategoryLocation = require('./subCategoryLocationMapping');
const subCatRelatedsubCat = require('./subCatRelatedsubCatMapping');
const subCategoryBlog = require('./subCategoryBlogMapping');

module.exports = {
  users,
  location,
  serviceCategory,
  serviceSubCategory,
  company,
  blog,
  CompanyLocation,
  subCategoryLocation,
  subCatRelatedsubCat,
  subCategoryBlog
};
