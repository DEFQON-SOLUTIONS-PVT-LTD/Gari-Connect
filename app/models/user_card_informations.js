const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_card_informations', {
    user_card_information_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    card_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    card_expiry: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_card_informations',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "user_card_information_pkey",
        unique: true,
        fields: [
          { name: "user_card_information_id" },
        ]
      },
    ]
  });
};
