const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res, next) => {
  db.query("SELECT *, p.id as id_product FROM products p INNER JOIN categories c ON p.id_category = c.id INNER JOIN supliers s ON p.id_suplier = s.id", (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

router.get("/getcode", (req, res, next) => {
  db.query("SELECT MAX(id) AS last_id FROM products", (err, results) => {
    if (err) return next(err);

    const lastId = results[0].last_id || 0;
    const nextNumber = lastId + 1;

    // bikin kode dengan 5 digit, misal 00001, 00002
    const kodeBarang = "BRG" + nextNumber.toString().padStart(5, "0");

    res.json({ kode: kodeBarang });
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(results[0]);
  });
});

router.post("/", (req, res, next) => {
  const { product_code, product_name, product_price, id_category, id_suplier } = req.body;
  db.query("INSERT INTO products (product_code, product_name, product_price, id_category, id_suplier) VALUES (?, ?, ?, ?, ?)", [product_code, product_name, product_price, id_category, id_suplier], (err, result) => {
    if (err) return next(err);
    res.status(201).json({ id: result.insertId, product_name, product_price });
  });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { product_code, product_name, product_price, id_category, id_suplier } = req.body;
  db.query("UPDATE products SET product_code=?, product_name=?, product_price=?, id_category=?, id_suplier=? WHERE id=?", [product_code, product_name, product_price, id_category, id_suplier, id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json({ id: result.insertId, product_name, product_price });
  });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json({ message: "Produk berhasil dihapus" });
  });
});

module.exports = router;