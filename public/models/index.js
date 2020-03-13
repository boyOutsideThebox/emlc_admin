var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
require('dotenv').config();//instatiate environment variables
var env       = process.env.NODE_ENV;
var dbConfig    = require(__dirname + '/../config/dbConfig.json')[env];
var db        = {};

/* Connecting DB using Sequelize */
if (dbConfig.use_env_variable) {
    var sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  });
} else {
    var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect
  });
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
