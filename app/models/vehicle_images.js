const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_images', {
    vehicle_image_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vehicles',
        key: 'vehicleId'
      }
    },
    setCover: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehicle_images',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "fki_vehicleId",
        fields: [
          { name: "vehicleId" },
        ]
      },
      {
        name: "vehicle_images_pkey",
        unique: true,
        fields: [
          { name: "vehicle_image_id" },
        ]
      },
    ]
  });
};
