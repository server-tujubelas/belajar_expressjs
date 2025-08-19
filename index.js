require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

app.use(logger);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET semua produk
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

// Categories
const categoriesRoutes = require("./routes/categories");
app.use("/categories", categoriesRoutes);

// Supliers
const supliersRoutes = require("./routes/supliers");
app.use("/supliers", supliersRoutes);

// customers
const customersRoutes = require("./routes/customers");
app.use("/customers", customersRoutes);

app.use(notFound);
app.use(errorHandler);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
