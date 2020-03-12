module.exports = (sequelize, DataTypes) => {
    const serviceSubCategory = sequelize.define('hs_service_sub_categories', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      name: {type: DataTypes.STRING, required: true},
      description: DataTypes.TEXT,
      service_image: DataTypes.STRING,
      service_url: DataTypes.STRING,
      ser_cat_id: DataTypes.INTEGER,
      service_meta_titel: DataTypes.TEXT,
      service_meta_keyword: DataTypes.TEXT,
      service_meta_desc: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      IsActive: DataTypes.BOOLEAN,
      base_price: DataTypes.DECIMAL(10,2),
      service_charge: DataTypes.DECIMAL(10,2),
      others_charge: DataTypes.DECIMAL(10,2),
      total_cost: DataTypes.DECIMAL(10,2),
      discount: DataTypes.DECIMAL(10,2),
      recommended: DataTypes.BOOLEAN
    }, {  });
  
    serviceSubCategory.associate = function(models) {
      // associations can be defined here
      serviceSubCategory.belongsTo(models.hs_service_categories, {
        foreignKey: 'ser_cat_id',
        as: 'servicecategory'
      });
      
      serviceSubCategory.belongsToMany( models.hs_location, {
          through: models.hs_subCategory_location_mapping,
          foreignKey: 'loc_id',
          otherKey: 'sub_cat_id'
      });

      serviceSubCategory.belongsToMany( models.hs_service_sub_categories, {
        as: 'mastersubcategory',
        through: models.hs_subCategory_related_other_subCategory,
        foreignKey: 'sub_cat_id',
        otherKey: 'rltd_sub_cat_id'
      });

      serviceSubCategory.belongsToMany( models.hs_service_sub_categories, {
        as: 'relatedsubcategory',
        through: models.hs_subCategory_related_other_subCategory,
        foreignKey: 'rltd_sub_cat_id',
        otherKey: 'sub_cat_id'
      });

      serviceSubCategory.belongsToMany( models.hs_blog, {
        through: models.hs_subCategory_blog_mapping,
        foreignKey: 'blog_id',
        otherKey: 'sub_cat_id'
      });
    };
  
    return serviceSubCategory;
  };