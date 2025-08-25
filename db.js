const { Sequelize } = require('sequelize');

// Setup sequelize instance dan koneksi ke MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false // Menonaktifkan log SQL untuk bersih
});

module.exports = sequelize;

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Koneksi database gagal: ", err);
//     return;
//   }
//   console.log("Terhubung ke database MySQL ✅");
// });

// module.exports = connection;
