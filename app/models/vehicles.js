const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicles', {
    vehicleId: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'locations',
        key: 'locationId'
      }
    },
    plate_number: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    seats: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    vehicle_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicle_types',
        key: 'vehicle_type_id'
      }
    },
    green_vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'green_vehicles',
        key: 'green_vehicle_id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'categoryId'
      }
    },
    transmissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transmissions',
        key: 'transmissionId'
      }
    },
    main_image: {
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
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    modelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'models',
        key: 'modelId'
      }
    },
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    price_inc_driver: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Isfavourite: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cancel: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    availability_startdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    availability_enddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    chassis_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eco_friendly_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'eco_friendly',
        key: 'eco_friendly_Id'
      }
    },
    additional_Price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    with_driver: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    pickAndDrop: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehicles',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "fki_categoryId",
        fields: [
          { name: "categoryId" },
        ]
      },
      {
        name: "fki_green_vehicle_id",
        fields: [
          { name: "green_vehicle_id" },
        ]
      },
      {
        name: "fki_locationId",
        fields: [
          { name: "locationId" },
        ]
      },
      {
        name: "fki_modelId",
        fields: [
          { name: "modelId" },
        ]
      },
      {
        name: "fki_transmissionId",
        fields: [
          { name: "transmissionId" },
        ]
      },
      {
        name: "fki_vehicle_type_id",
        fields: [
          { name: "vehicle_type_id" },
        ]
      },
      {
        name: "vehicle_pkey",
        unique: true,
        fields: [
          { name: "vehicleId" },
        ]
      },
    ]
  });
};
