const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logs', {
    logId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    controller: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    method: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'logs',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "logs_pkey",
        unique: true,
        fields: [
          { name: "logId" },
        ]
      },
    ]
  });
};
