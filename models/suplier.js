const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Suplier = sequelize.define('Suplier', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  suplier_name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  suplier_address:{
    type: DataTypes.STRING,
    allowNull:false
  },
  suplier_phone:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'supliers',
  timestamps: false
});

module.exports = Suplier;