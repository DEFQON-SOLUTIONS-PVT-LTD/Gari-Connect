const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_availability', {
    vehicle_availability_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dayid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'days',
        key: 'dayId'
      }
    },
    vehicleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicles',
        key: 'vehicleId'
      }
    }
  }, {
    sequelize,
    tableName: 'vehicle_availability',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "vehicle_availability_pkey",
        unique: true,
        fields: [
          { name: "vehicle_availability_id" },
        ]
      },
    ]
  });
};
