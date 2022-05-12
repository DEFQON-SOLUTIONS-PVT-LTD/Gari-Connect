const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phoneno: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cnic: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cnic_validity: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    driving_license_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    license_validity: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    otp_expiry: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    permissionId: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'permissions',
        key: 'permissionId'
      }
    },
    roleId: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'roleId'
      }
    },
    cityId: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'city',
        key: 'cityId'
      }
    },
    isGoogleUser: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    isFacebookUser: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "fki_cityId",
        fields: [
          { name: "cityId" },
        ]
      },
      {
        name: "fki_permissionId",
        fields: [
          { name: "permissionId" },
        ]
      },
      {
        name: "fki_roleId",
        fields: [
          { name: "roleId" },
        ]
      },
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
