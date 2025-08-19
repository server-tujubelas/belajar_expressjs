const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM supliers", (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query("SELECT * FROM supliers WHERE id = ?", [id], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(404).json({ message: "Suplier tidak ditemukan" });
    res.json(results[0]);
  });
});

router.post("/", (req, res, next) => {
  const { suplier_name, suplier_address, suplier_phone } = req.body;
  db.query("INSERT INTO supliers (suplier_name, suplier_address, suplier_phone) VALUES (?, ?, ?)", [suplier_name, suplier_address, suplier_phone], (err, result) => {
    if (err) return next(err);
    res.status(201).json({ id: result.insertId, suplier_name });
  });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { suplier_name, suplier_address, suplier_phone } = req.body;
  db.query("UPDATE supliers SET suplier_name=?, suplier_address=?, suplier_phone=? WHERE id=?", [suplier_name, suplier_address, suplier_phone, id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Suplier tidak ditemukan" });
    res.json({ id: result.insertId, suplier_name });
  });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query("DELETE FROM supliers WHERE id=?", [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Suplier tidak ditemukan" });
    res.json({ message: "Suplier berhasil dihapus" });
  });
});

module.exports = router;