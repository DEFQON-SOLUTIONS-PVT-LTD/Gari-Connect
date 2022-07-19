const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('locations', {
    locationId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    floor: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    area: {
      type: DataTypes.TEXT,
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
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    streetAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'locations',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "location_pkey",
        unique: true,
        fields: [
          { name: "locationId" },
        ]
      },
    ]
  });
};
