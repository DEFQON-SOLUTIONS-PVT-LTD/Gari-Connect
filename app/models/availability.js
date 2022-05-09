const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('availability', {
    availabilityId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dayId: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'days',
        key: 'dayId'
      }
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
    tableName: 'availability',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "availability_pkey",
        unique: true,
        fields: [
          { name: "availabilityId" },
        ]
      },
      {
        name: "fki_dayId",
        fields: [
          { name: "dayId" },
        ]
      },
    ]
  });
};
