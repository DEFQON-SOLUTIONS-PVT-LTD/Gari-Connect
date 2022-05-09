const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guidelines', {
    guidelineId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
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
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'guidelines',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "guideline_pkey",
        unique: true,
        fields: [
          { name: "guidelineId" },
        ]
      },
    ]
  });
};
