module.exports = (sequelize, DataTypes) => {
    const CompanyLocation = sequelize.define('hs_company_location_mapping', {
      loc_id: DataTypes.INTEGER,
      comp_id: DataTypes.INTEGER
    }, { 
      tableName: 'hs_company_location_mapping',
      defaultPrimaryKey: false,
      timestamps: false,
     });

    CompanyLocation.removeAttribute('id');
  
    CompanyLocation.associate = function(models) {
      // associations can be defined here
      CompanyLocation.belongsTo(models.hs_company, {foreignKey: 'comp_id'});
      CompanyLocation.belongsTo(models.hs_location, {foreignKey: 'loc_id'})
    };
  
    return CompanyLocation;
  };