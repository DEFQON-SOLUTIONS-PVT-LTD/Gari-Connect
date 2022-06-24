const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_mandatory_features', {
    vehicle_mandatory_features_Id: {
      autoIncrement: true,
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
    fueltype: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fuel_type',
        key: 'fuelId'
      }
    },
    kmpl: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    doors: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehicle_mandatory_features',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "vehicle_mandatory_features_pkey",
        unique: true,
        fields: [
          { name: "vehicle_mandatory_features_Id" },
        ]
      },
    ]
  });
};
