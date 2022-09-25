const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
// Retrieve all employees
router.get('/', userController.findAll)
router.post('/', userController.create)
router.get('/:id/', userController.findById)
router.post('/:id/createOrder', userController.createOrder)
router.get('/:id/getOrders', userController.getOrders)
// no delete,update needed for user
module.exports = router
