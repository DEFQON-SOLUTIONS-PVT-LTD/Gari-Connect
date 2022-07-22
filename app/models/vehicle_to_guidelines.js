const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_to_guidelines', {
    vehicle_to_guideline_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vehicles',
        key: 'vehicleId'
      }
    },
    guidelineId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehicle_to_guidelines',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_V",
        fields: [
          { name: "vehicleId" },
        ]
      },
      {
        name: "vehicle_to_guidelines_pkey",
        unique: true,
        fields: [
          { name: "vehicle_to_guideline_id" },
        ]
      },
    ]
  });
};
