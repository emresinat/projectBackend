'use strict'
const dbConn = require('../config/dbConfig')

const Order = function (order) {
  this.userId = order.userId
}

Order.create = function (newOrder, result) {
  dbConn.query('INSERT INTO orders SET ?', newOrder, function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res.insertId)
    }
  })
}

Order.findById = function (id, result) {
  dbConn.query('SELECT orders.id AS userOrderId, products.`name` AS productName, products.price AS productPrice FROM orders JOIN users ON orders.userId = users.id INNER JOIN orderdetails ON orders.id = orderdetails.orderId INNER JOIN products ON orderdetails.productId = products.id WHERE orders.id=?', id, function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

Order.findAll = function (result) {
  dbConn.query('SELECT orders.id AS userOrderId, products.`name` AS productName, products.price AS productPrice FROM orders JOIN users ON orders.userId = users.id INNER JOIN orderdetails ON orders.id = orderdetails.orderId INNER JOIN products ON orderdetails.productId = products.id', function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

module.exports = Order
