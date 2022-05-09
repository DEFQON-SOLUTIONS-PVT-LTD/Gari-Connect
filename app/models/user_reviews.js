const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_reviews', {
    user_review_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId'
      }
    }
  }, {
    sequelize,
    tableName: 'user_reviews',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "fki_userId",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "user_reviews_pkey",
        unique: true,
        fields: [
          { name: "user_review_id" },
        ]
      },
    ]
  });
};
