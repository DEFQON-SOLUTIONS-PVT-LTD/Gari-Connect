const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookings', {
    bookingId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vehicles',
        key: 'vehicleId'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'status',
        key: 'statusId'
      }
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isReject: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    driver_cost: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    trip_startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    trip_endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bookings',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "bookings_pkey",
        unique: true,
        fields: [
          { name: "bookingId" },
        ]
      },
    ]
  });
};
