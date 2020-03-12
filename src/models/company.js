module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('hs_company', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, required: true },
    sub_heading: DataTypes.STRING,
    about: DataTypes.TEXT,
    is_verified: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    email: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    IsActive: DataTypes.BOOLEAN,
    trade_licence_no: DataTypes.STRING,
    trade_licence_doc: DataTypes.STRING,
    other_document: DataTypes.STRING,
    other_doc_name: DataTypes.STRING,
    pan_no: DataTypes.STRING
  }, {
      tableName: 'hs_company'
    });

  Company.associate = function (models) {
    // associations can be defined here
    Company.hasOne(models.hs_users, {
      foreignKey: 'company_id',
      as: 'companyuser',
    });

    Company.belongsToMany(models.hs_location, {
      through: models.hs_company_location_mapping,
      foreignKey: 'loc_id',
      otherKey: 'comp_id'
    });
  };

  return Company;
};