const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query("SELECT * FROM categories WHERE id = ?", [id], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(404).json({ message: "Kategori tidak ditemukan" });
    res.json(results[0]);
  });
});

router.post("/", (req, res, next) => {
  const { category_name } = req.body;
  db.query("INSERT INTO categories (category_name) VALUES (?)", [category_name], (err, result) => {
    if (err) return next(err);
    res.status(201).json({ id: result.insertId, category_name });
  });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { category_name } = req.body;
  db.query("UPDATE categories SET category_name=? WHERE id=?", [category_name, id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Kategori tidak ditemukan" });
    res.json({ id: result.insertId, category_name });
  });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query("DELETE FROM categories WHERE id=?", [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Kategori tidak ditemukan" });
    res.json({ message: "Kategori berhasil dihapus" });
  });
});

module.exports = router;