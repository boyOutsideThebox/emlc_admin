module.exports = (sequelize, DataTypes) => {
    const subCategoryRltdsubCat = sequelize.define('hs_subCategory_related_other_subCategory', {
        sub_cat_id: DataTypes.INTEGER,
        rltd_sub_cat_id: DataTypes.INTEGER      
    }, { 
      tableName: 'hs_subCategory_related_other_subCategory',
      defaultPrimaryKey: false,
      timestamps: false,
     });

     subCategoryRltdsubCat.removeAttribute('id');
  
     subCategoryRltdsubCat.associate = function(models) {
      // associations can be defined here
      subCategoryRltdsubCat.belongsTo(models.hs_service_sub_categories, {
          foreignKey: 'sub_cat_id'
        });
      subCategoryRltdsubCat.belongsTo(models.hs_service_sub_categories, {
          as: 'relatedsubcategory',
          foreignKey: 'rltd_sub_cat_id'
        });
    };
  
    return subCategoryRltdsubCat;
  };