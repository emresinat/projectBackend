'use strict'
const User = require('../models/userModel')
const dbConn = require('../config/dbConfig')

exports.findAll = function (req, res) {
  User.findAll(function (err, users) {
    if (err) { res.send(err) }
    res.send(users)
  })
}
exports.create = function (req, res) {
  const newUser = new User(req.body)
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required fields' })
  } else {
    User.create(newUser, function (err, user) {
      if (err) { res.send(err) }
      res.json({ error: false, message: 'User added successfully!', data: user })
    })
  }
}
exports.findById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) { res.send(err) }
    res.json(user)
  })
}

exports.createOrder = async function (req, res) {
  const userId = req.params.id
  const products = req.body.products
  if (userId) {
    let orderId = null
    const result = await dbConn.promise().query('INSERT INTO orders (userId) VALUES (?)', userId)
    orderId = result[0].insertId
    products?.forEach(product => {
      const intProduct = parseInt(product?.id)
      dbConn.query('INSERT INTO orderdetails (orderId, productId) VALUES (?,?)', [orderId, intProduct], function (err, response) {
        if (err) {
          console.log('error: ', err)
          res.send(err)
        } else {
          res.send()
        }
      })
    })
  } else {
    res.send('Could not find the user!')
  }
}

exports.getOrders = async function (req, res) {
  const userId = req.params.id
  if (userId) {
    dbConn.query('SELECT orders.id AS userOrderId, products.`name` AS productName, products.price AS productPrice FROM orders JOIN users ON orders.userId = users.id INNER JOIN orderdetails ON orders.id = orderdetails.orderId INNER JOIN products ON orderdetails.productId = products.id WHERE users.id=?', userId, function (err, response) {
      if (err) {
        console.log('error: ', err)
        res.send(err)
      } else {
        res.send(response)
      }
    })
  } else {
    res.send('Could not find the user!')
  }
}
