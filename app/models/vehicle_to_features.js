const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_to_features', {
    vehicle_to_feature_id: {
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
    featureId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'features',
        key: 'featureId'
      }
    }
  }, {
    sequelize,
    tableName: 'vehicle_to_features',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "vehicle_to_features_pkey",
        unique: true,
        fields: [
          { name: "vehicle_to_feature_id" },
        ]
      },
    ]
  });
};
