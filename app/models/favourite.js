const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favourite', {
    favouriteId: {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    }
  }, {
    sequelize,
    tableName: 'favourite',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "favourite_pkey",
        unique: true,
        fields: [
          { name: "favouriteId" },
        ]
      },
    ]
  });
};
