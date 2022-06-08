const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('status', {
    statusId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "status_pkey",
        unique: true,
        fields: [
          { name: "statusId" },
        ]
      },
    ]
  });
};
