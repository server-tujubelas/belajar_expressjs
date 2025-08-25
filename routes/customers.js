const express = require("express");
const router = express.Router();

const customersController = require('../controllers/customersController');

router.get('/', customersController.getCustomers);
router.get('/:id', customersController.getCustomersById);
router.post('/', customersController.createCustomers);
router.put('/:id', customersController.updateCustomers);
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;