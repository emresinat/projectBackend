const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
// Retrieve all employees
router.get('/', productController.findAll)
router.post('/', productController.create)
router.get('/:id', productController.findById)
router.put('/:id/', productController.update)
router.delete('/:id/', productController.delete)
module.exports = router
