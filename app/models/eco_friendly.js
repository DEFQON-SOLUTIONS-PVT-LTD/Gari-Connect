const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eco_friendly', {
    eco_friendly_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'eco_friendly',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "eco_friendly_pkey",
        unique: true,
        fields: [
          { name: "eco_friendly_Id" },
        ]
      },
    ]
  });
};
