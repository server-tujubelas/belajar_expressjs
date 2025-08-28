const express = require("express");
const router = express.Router();

const supliersController = require('../controllers/supliersController');

router.get('/', supliersController.getSupliers);
router.get('/:id', supliersController.getSupliersById);
router.post('/', supliersController.createSupliers);
router.put('/:id', supliersController.updateSupliers);
router.delete('/:id', supliersController.deleteSuplier);

module.exports = router;