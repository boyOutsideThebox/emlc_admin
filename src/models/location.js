module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('hs_location', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      name: {type: DataTypes.STRING, required: true},
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      IsActive: DataTypes.BOOLEAN
    }, {  });
  
    Location.associate = function(models) {
      // associations can be defined here
      
      Location.belongsToMany( models.hs_service_sub_categories, {
          through: models.hs_subCategory_location_mapping,
          foreignKey: 'sub_cat_id',
          otherKey: 'loc_id'
      });

      Location.belongsToMany( models.hs_company, {
        through: models.hs_company_location_mapping,
        foreignKey: 'comp_id',
        otherKey: 'loc_id'
      });
    };
  
    return Location;
  };