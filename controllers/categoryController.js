const { validateRequired } = require('../helpers/validator');
const Category = require('../models/category');

// Mendapatkan semua kategori
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll(); // Sequelize akan menangani query
    res.json(categories);
  } catch (err) {
    next(err); // Error handling jika terjadi kesalahan
  }
};

// Mendapatkan kategori berdasarkan ID
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id); // findByPk mencari berdasarkan Primary Key

    if (!category) {
      return res.status(404).json({ success: false, message: "Kategori tidak ditemukan" });
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// Menambahkan kategori baru
const createCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;
    const requiredFields = {
      category_name: "Kategori",
    };

    const missing = validateRequired(req.body, requiredFields);

    if (missing.length > 0) {
      return res.status(400).json({
        success:false,
        message:`${missing.join(", ")} tidak boleh kosong.`
      })
    }
    const newCategory = await Category.create({ category_name });
    res.status(201).json({success:true, message:"Berhasil menambah data", data:newCategory });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params; // Mendapatkan ID kategori dari parameter URL
    const { category_name } = req.body; // Mendapatkan nama kategori baru dari request body
    const requiredFields = {
      category_name: "Kategori",
    };

    const missing = validateRequired(req.body, requiredFields);

    if (missing.length > 0) {
      return res.status(400).json({
        success:false,
        message:`${missing.join(", ")} tidak boleh kosong.`
      })
    }

    // Mencari kategori berdasarkan ID
    const category = await Category.findByPk(id);

    if (!category) {
      // Jika kategori tidak ditemukan, beri respons 404
      return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
    }

    // Mengupdate kategori yang ditemukan
    const updatedCategory = await category.update({ category_name });

    // Kirimkan response dengan data kategori yang telah diperbarui
    res.status(200).json({success:true, message:"Berhasil menambah data", data:newCategory });
  } catch (err) {
    next(err); // Kirimkan error ke middleware error handler
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await category.destroy();

    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (err) {
    next(err);
  }
};


module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
