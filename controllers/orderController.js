'use strict'
const Order = require('../models/orderModel')

exports.findAll = function (req, res) {
  Order.findAll(function (err, order) {
    if (err) { res.send(err) }
    res.send(order)
  })
}
exports.create = function (req, res) {
  const newOrder = new Order(req.query)

  if (req.query === Object && Object.keys(req.query).length !== 2) {
    res.status(400).send({ error: true, message: 'Please provide all required fields' })
  } else {
    Order.create(newOrder, function (err, order) {
      if (err) { res.send(err) }
      res.json({ error: false, message: 'Order created successfully!' })
    })
  }
}

exports.findById = function (req, res) {
  Order.findById(req.params.id, function (err, order) {
    if (err) { res.send(err) }
    res.json(order)
  })
}
