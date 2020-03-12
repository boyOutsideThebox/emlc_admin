module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('hs_blog', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      blog_title: {type: DataTypes.STRING, required: false},
      blog_url: {type: DataTypes.STRING, required: false},
      blog_desc: DataTypes.TEXT,
      coverr_img: DataTypes.STRING,
      meta_titel: DataTypes.STRING,
      meta_desc: DataTypes.TEXT,
      meta_key: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      IsActive: DataTypes.BOOLEAN
    }, { 
      tableName: 'hs_blog'
     });
  
     Blog.associate = function(models) {
      // associations can be defined here
      Blog.belongsToMany( models.hs_service_sub_categories, {
        through: models.hs_subCategory_blog_mapping,
        foreignKey: 'sub_cat_id',
        otherKey: 'blog_id'
      });
    };
  
    return Blog;
  };