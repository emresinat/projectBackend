'use strict'
const mysql = require('mysql2')
// local mysql db connection
const dbConn = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5522114',
  password: 'LhVXpEsyEB',
  database: 'sql5522114'
})
dbConn.connect(function (err) {
  if (err) throw err
  console.log('Database Connected!')
})
module.exports = dbConn
