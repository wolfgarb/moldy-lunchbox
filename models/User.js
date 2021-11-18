const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
  {
    // define an ID column
    id: {
        // use the special seq datatypes obj to provide what type of data
        type: DataTypes.INTEGER,
        // aka 'not null'
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // define an email col
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4]
      }
    }
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;