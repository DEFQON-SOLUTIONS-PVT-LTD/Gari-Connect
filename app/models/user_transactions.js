const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_transactions', {
    user_transaction_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: "POINT",
      allowNull: true
    },
    user_card_information_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_card_informations',
        key: 'user_card_information_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_transactions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "fki_user_card_information_id",
        fields: [
          { name: "user_card_information_id" },
        ]
      },
      {
        name: "user_transaction_pkey",
        unique: true,
        fields: [
          { name: "user_transaction_id" },
        ]
      },
    ]
  });
};
