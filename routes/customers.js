const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query("SELECT * FROM customers WHERE id = ?", [id], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(404).json({ message: "Data pelanggan tidak ditemukan" });
    res.json(results[0]);
  });
});

router.post("/", (req, res, next) => {
  const { cust_name, cust_address, cust_phone } = req.body;
  db.query("INSERT INTO customers (cust_name, cust_address, cust_phone) VALUES (?, ?, ?)", [cust_name, cust_address, cust_phone], (err, result) => {
    if (err) return next(err);
    res.status(201).json({ id: result.insertId, cust_name });
  });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { cust_name, cust_address, cust_phone } = req.body;
  db.query("UPDATE customers SET cust_name=?, cust_address=?, cust_phone=? WHERE id=?", [cust_name, cust_address, cust_phone, id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Data pelanggan tidak ditemukan" });
    res.json({ id: result.insertId, cust_name });
  });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query("DELETE FROM customers WHERE id=?", [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Data pelanggan tidak ditemukan" });
    res.json({ message: "Data pelanggan berhasil dihapus" });
  });
});

module.exports = router;