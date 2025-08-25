const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories', // Nama tabel di database
  timestamps: false // Jika tidak ada kolom createdAt, updatedAt
});

module.exports = Category;
