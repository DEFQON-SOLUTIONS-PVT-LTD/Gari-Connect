const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('models', {
    modelId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    makeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'makes',
        key: 'makeId'
      }
    },
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'models',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "fki_makeId",
        fields: [
          { name: "makeId" },
        ]
      },
      {
        name: "model_pkey",
        unique: true,
        fields: [
          { name: "modelId" },
        ]
      },
    ]
  });
};
