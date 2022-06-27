const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fuel_type', {
    fuelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fuel_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fuel_type_pkey",
        unique: true,
        fields: [
          { name: "fuelId" },
        ]
      },
    ]
  });
};
