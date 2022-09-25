const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
// Retrieve all employees
router.get('/', orderController.findAll)
router.post('/', orderController.create)
router.get('/:id/', orderController.findById)
module.exports = router
