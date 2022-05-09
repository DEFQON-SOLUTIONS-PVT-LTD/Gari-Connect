const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    cityId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'State',
        key: 'stateId'
      }
    }
  }, {
    sequelize,
    tableName: 'city',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "city_pkey",
        unique: true,
        fields: [
          { name: "cityId" },
        ]
      },
      {
        name: "fki_stateId",
        fields: [
          { name: "stateId" },
        ]
      },
    ]
  });
};
