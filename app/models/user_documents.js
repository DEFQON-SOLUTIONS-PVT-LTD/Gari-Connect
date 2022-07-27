const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_documents', {
    user_document_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING(255),
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
    document_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    doc_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    validity: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_documents',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "user_document_pkey",
        unique: true,
        fields: [
          { name: "user_document_id" },
        ]
      },
    ]
  });
};
