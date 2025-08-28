const { validateRequired } = require('../helpers/validator');
const { Suplier, Product, Category } = require('../models');

const getProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Suplier, Category]
    });
    if (!products) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }
    res.json({success: true, message:"OK", data:products});
  } catch (error) {
    next(error);
  }
};

const getProductById = async(req, res, next) => {
  try {
    const {id} = req.params;
    const products = await Product.findByPk(id);

    if (!products) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }
    res.json({success: true, message:"OK", data:products});
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {suplier_name, suplier_address, suplier_phone} = req.body;
    const requiredFields = {
      suplier_name: "Nama Suplier",
      suplier_address: "Alamat Suplier",
      suplier_phone: "Nomor Telepon Suplier"
    };

    const missing = validateRequired(req.body, requiredFields);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${missing.join(", ")} Tidak boleh kosong.`
      });
    }

    const newProduct = await Product.create({
      suplier_name, suplier_address, suplier_phone
    });

    res.status(201).json({success:true, message:"Berhasil menambah data", data:newProduct});
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {suplier_name, suplier_address, suplier_phone} = req.body;
    const requiredFields = {
      suplier_name: "Nama Pelanggan",
      suplier_address: "Alamat",
      suplier_phone: "Nomor Telepon"
    };

    const missing = validateRequired(req.body, requiredFields);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${missing.join(", ")} Tidak boleh kosong.`
      });
    }

    const customer = await Product.findByPk(id);

    if (!customer) {
      return res.status(404).json({success:false, message:"Data tidak ditemukan"});
    }

    const updatedCustomer = await customer.update({
      suplier_name, suplier_address, suplier_phone
    });

    res.status(200).json({success:true, message:"Data berhasil diperbaharui", data: updatedCustomer});
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    const customer = await Product.findByPk(id);

    if (!customer) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }

    await customer.destroy();

    res.status(200).json({success:true, message:"Data berhasil dihapus"});
  } catch (error) {
    next(error);
  }
}

module.exports = {getProduct, getProductById, createProduct, updateProduct, deleteProduct};