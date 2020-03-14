module.exports = (sequelize, DataTypes) => {
    const serviceCategory = sequelize.define('hs_service_categories', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      name: {type: DataTypes.STRING, required: true},
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      in_home_page: DataTypes.BOOLEAN,
      cate_url: DataTypes.STRING,
      cate_meta_titel: DataTypes.TEXT,
      cate_meta_keyword: DataTypes.TEXT,
      cate_meta_desc: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      IsActive: DataTypes.BOOLEAN
    }, {  });
  
    serviceCategory.associate = function(models) {
      // associations can be defined here
      serviceCategory.hasOne(models.hs_service_sub_categories, {
        foreignKey: 'ser_cat_id',
        as: 'servicesubcategory',
      });
    };
  
    return serviceCategory;
  };