'use strict'
const dbConn = require('../config/dbConfig')

const Product = function (product) {
  this.name = product.name
  this.price = product.price
}

Product.create = function (newProduct, result) {
  dbConn.query('INSERT INTO products SET ?', newProduct, function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res.insertId)
    }
  })
}
Product.findById = function (id, result) {
  dbConn.query('SELECT * FROM products WHERE id = ? ', id, function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}
Product.findAll = function (result) {
  dbConn.query('SELECT * FROM products', function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}
Product.update = function (id, product, result) {
  dbConn.query('UPDATE products SET name=?,price=? WHERE id = ?', [product.name, product.price, id], function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}
Product.delete = function (id, result) {
  dbConn.query('DELETE FROM products WHERE id = ?', [id], function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}
module.exports = Product
