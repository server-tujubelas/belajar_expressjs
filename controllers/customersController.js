const { validateRequired } = require('../helpers/validator');
const Customers = require('../models/customers');

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customers.findAll();
    if (!customers) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }
    res.json({success: true, message:"OK", data:customers});
  } catch (error) {
    next(error);
  }
};

const getCustomersById = async(req, res, next) => {
  try {
    const {id} = req.params;
    const customers = await Customers.findByPk(id);

    if (!customers) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }
    res.json({success: true, message:"OK", data:customers});
  } catch (error) {
    next(error);
  }
};

const createCustomers = async (req, res, next) => {
  try {
    const {cust_name, cust_address, cust_phone} = req.body;
    const requiredFields = {
      cust_name: "Nama Pelanggan",
      cust_address: "Alamat",
      cust_phone: "Nomor Telepon"
    };

    const missing = validateRequired(req.body, requiredFields);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${missing.join(", ")} Tidak boleh kosong.`
      });
    }

    const newCustomers = await Customers.create({
      cust_name, cust_address, cust_phone
    });

    res.status(201).json({success:true, message:"Berhasil menambah data", data:newCustomers});
  } catch (error) {
    next(error);
  }
};

const updateCustomers = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {cust_name, cust_address, cust_phone} = req.body;
    const requiredFields = {
      cust_name: "Nama Pelanggan",
      cust_address: "Alamat",
      cust_phone: "Nomor Telepon"
    };

    const missing = validateRequired(req.body, requiredFields);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${missing.join(", ")} Tidak boleh kosong.`
      });
    }

    const customer = await Customers.findByPk(id);

    if (!customer) {
      return res.status(404).json({success:false, message:"Data tidak ditemukan"});
    }

    const updatedCustomer = await customer.update({
      cust_name, cust_address, cust_phone
    });

    res.status(200).json({success:true, message:"Data berhasil diperbaharui", data: updatedCustomer});
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const {id} = req.params;
    const customer = await Customers.findByPk(id);

    if (!customer) {
      return res.status(404).json({success: false, message: "Data tidak ditemukan"});
    }

    await customer.destroy();

    res.status(200).json({success:true, message:"Data berhasil dihapus"});
  } catch (error) {
    next(error);
  }
}

module.exports = {getCustomers, getCustomersById, createCustomers, updateCustomers, deleteCustomer};