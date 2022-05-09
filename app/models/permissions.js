const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permissions', {
    permissionId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
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
    tableName: 'permissions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "permission_pkey",
        unique: true,
        fields: [
          { name: "permissionId" },
        ]
      },
    ]
  });
};
