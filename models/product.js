const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_code:{
    type: DataTypes.STRING,
    allowNull:false
  },
  product_name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  product_price:{
    type: DataTypes.STRING,
    allowNull:false
  },
  id_category:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  id_suplier:{
    type: DataTypes.INTEGER,
    allowNull:false
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;