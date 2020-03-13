module.exports = (sequelize, DataTypes) => {
    const subCategoryBlog = sequelize.define('hs_subCategory_blog_mapping', {
        sub_cat_id: DataTypes.INTEGER,
        blog_id: DataTypes.INTEGER      
    }, { 
      tableName: 'hs_subCategory_blog_mapping',
      defaultPrimaryKey: false,
      timestamps: false,
     });

    subCategoryBlog.removeAttribute('id');
  
    subCategoryBlog.associate = function(models) {
      // associations can be defined here
      subCategoryBlog.belongsTo(models.hs_service_sub_categories, {foreignKey: 'sub_cat_id'});
      subCategoryBlog.belongsTo(models.hs_blog, {foreignKey: 'blog_id'})
    };
  
    return subCategoryBlog;
  };