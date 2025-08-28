const { validateRequired } = require('../helpers/validator');
const { Suplier, Product } = require('../models');

const getSupliers = async (req, res, next) => {
  try {
    const supliers = await Suplier.findAll();
    if (!supliers) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }
    res.json({success: true, message:"OK", data:supliers});
  } catch (error) {
    next(error);
  }
};

const getSupliersById = async(req, res, next) => {
  try {
    const {id} = req.params;
    const supliers = await Suplier.findByPk(id);

    if (!supliers) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }
    res.json({success: true, message:"OK", data:supliers});
  } catch (error) {
    next(error);
  }
};

const createSupliers = async (req, res, next) => {
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

    const newSupliers = await Suplier.create({
      suplier_name, suplier_address, suplier_phone
    });

    res.status(201).json({success:true, message:"Berhasil menambah data", data:newSupliers});
  } catch (error) {
    next(error);
  }
};

const updateSupliers = async (req, res, next) => {
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

    const customer = await Suplier.findByPk(id);

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

const deleteSuplier = async (req, res, next) => {
  try {
    const {id} = req.params;
    const customer = await Suplier.findByPk(id);

    if (!customer) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }

    await customer.destroy();

    res.status(200).json({success:true, message:"Data berhasil dihapus"});
  } catch (error) {
    next(error);
  }
}

module.exports = {getSupliers, getSupliersById, createSupliers, updateSupliers, deleteSuplier};