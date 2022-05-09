const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('days', {
    dayId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'days',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "days_pkey",
        unique: true,
        fields: [
          { name: "dayId" },
        ]
      },
    ]
  });
};
