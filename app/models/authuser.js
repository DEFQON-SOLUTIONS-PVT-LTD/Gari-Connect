const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authuser', {
    authuserId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    phone_no: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    otp_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'authuser',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "authuser_pkey",
        unique: true,
        fields: [
          { name: "authuserId" },
        ]
      },
    ]
  });
};
