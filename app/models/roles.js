const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    roleId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    created_by: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'roles',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "role_pkey",
        unique: true,
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
};
