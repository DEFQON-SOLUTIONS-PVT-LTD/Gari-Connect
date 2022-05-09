const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_reviews', {
    vehicle_review_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vehicles',
        key: 'vehicleId'
      }
    }
  }, {
    sequelize,
    tableName: 'vehicle_reviews',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "vehicle_reviews_pkey",
        unique: true,
        fields: [
          { name: "vehicle_review_id" },
        ]
      },
    ]
  });
};
