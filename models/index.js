// models/index.js
const Category = require('./Category');
const Suplier = require('./Suplier');
const Product = require('./Product');

Category.hasMany(Product, { foreignKey: 'id_category' });
Product.belongsTo(Category, { foreignKey: 'id_category' });

Suplier.hasMany(Product, { foreignKey: 'id_suplier' });
Product.belongsTo(Suplier, { foreignKey: 'id_suplier' });

module.exports = { Category, Product, Suplier };
