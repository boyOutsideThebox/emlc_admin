module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('hs_users', {
    UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, required: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    official_mail: DataTypes.STRING,
    transaction_mail: DataTypes.STRING,
    address: DataTypes.TEXT,
    primary_contact: DataTypes.STRING,
    secondary_contact: DataTypes.STRING,
    user_image: DataTypes.STRING,
    email: {
      type: DataTypes.STRING, 
      required: true,
      unique: true,
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: DataTypes.STRING, required: true }, 
    IsSuperAdmin: DataTypes.BOOLEAN,
    HasAdminPrivilege: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    IsActive: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    company_id: DataTypes.INTEGER
  }, { });

  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.hs_company, {
      foreignKey: 'company_id',
      as: 'usercompany'
    });
  };

  return Users;
};