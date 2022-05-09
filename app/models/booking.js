const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('booking', {
    bookingid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userid'
      }
    },
    vehicleid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vehicles',
        key: 'vehicleid'
      }
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    createdon: {
      type: DataTypes.DATE,
      allowNull: false
    },
    statusid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'status',
        key: 'statusid'
      }
    },
    createdat: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    updatedat: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'booking',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bookings_pkey",
        unique: true,
        fields: [
          { name: "bookingid" },
        ]
      },
    ]
  });
};
