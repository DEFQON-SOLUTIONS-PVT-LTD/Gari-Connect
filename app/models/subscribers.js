const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscribers', {
    subscriber_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subscribers',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "subscribers_pkey",
        unique: true,
        fields: [
          { name: "subscriber_id" },
        ]
      },
    ]
  });
};
