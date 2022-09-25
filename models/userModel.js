'use strict'
const dbConn = require('../config/dbConfig')

const User = function (user) {
  this.email = user.email
  this.password = user.password
}

User.create = function (newUser, result) {
  dbConn.query('INSERT INTO users SET ?', newUser, function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res.insertId)
    }
  })
}

User.findById = function (id, result) {
  dbConn.query('SELECT * FROM users WHERE id = ? ', id, function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

User.findAll = function (result) {
  dbConn.query('SELECT * FROM users', function (err, res) {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

module.exports = User
