module.exports = (sequelize, DataTypes) => {
    const subCategoryLocation = sequelize.define('hs_subCategory_location_mapping', {
        sub_cat_id: DataTypes.INTEGER,
        loc_id: DataTypes.INTEGER      
    }, { 
      tableName: 'hs_subCategory_location_mapping',
      defaultPrimaryKey: false,
      timestamps: false,
     });

    subCategoryLocation.removeAttribute('id');
  
    subCategoryLocation.associate = function(models) {
      // associations can be defined here
      subCategoryLocation.belongsTo(models.hs_service_sub_categories, {foreignKey: 'sub_cat_id'});
      subCategoryLocation.belongsTo(models.hs_location, {foreignKey: 'loc_id'})
    };
  
    return subCategoryLocation;
  };