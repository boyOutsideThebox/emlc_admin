var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
var env = process.env.NODE_ENV;
var dbConfig = require(__dirname + '/config/dbConfig.json')[env];

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//  "public" off of current is root
// app.use('/static', express.static('uploadedFiles'))
app.use('/uploadedFiles', express.static('uploadedFiles'))

//Log Env
console.log("Environment:", env);
console.log("Port:", process.env.PORT);
//DATABASE
const models = require("./models");
models.sequelize.authenticate()
  .then(() => {
    console.log('Connected to SQL database:', dbConfig.database);
  })
  .catch(err => {
    console.error('Unable to connect to SQL database:', dbConfig.database, err);
  });

if (env === 'development') {
  models.sequelize.sync();
}

// CORS
app.use(cors());

// API Router's 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var locationRouter = require('./routes/location');
var serviceCategoryRouter = require('./routes/service_category');
var serviceSubCategoryRouter = require('./routes/service_subCategory');
var companyRouter = require('./routes/company');
var blogRouter = require('./routes/blog');
var CompanyLocationRouter = require('./routes/CompanyLocationMapping');
var subCategoryLocation = require('./routes/subCategoryLocationMapping');
var subCatRelatedsubCat = require('./routes/subCatRelatedsubCatMapping');
var subCategoryBlog = require('./routes/subCategoryBlogMapping');

// API url's
app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api', locationRouter);
app.use('/api', serviceCategoryRouter);
app.use('/api', serviceSubCategoryRouter);
app.use('/api', companyRouter);
app.use('/api', blogRouter);
app.use('/api', CompanyLocationRouter);
app.use('/api', subCategoryLocation);
app.use('/api', subCatRelatedsubCat);
app.use('/api', subCategoryBlog);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status || 500).json({
    message: res.locals.message
  });
});

module.exports = app;

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', error);
});