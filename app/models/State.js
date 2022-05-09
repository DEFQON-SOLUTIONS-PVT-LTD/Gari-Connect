const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('State', {
    stateId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'State',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "State_pkey",
        unique: true,
        fields: [
          { name: "stateId" },
        ]
      },
    ]
  });
};
