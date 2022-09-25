const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World')
})
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
