const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Customers = sequelize.define('Customers', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cust_name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  cust_address:{
    type: DataTypes.STRING,
    allowNull:false
  },
  cust_phone:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'customers',
  timestamps: false
});

module.exports = Customers;