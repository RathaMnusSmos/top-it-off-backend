const express = require('express')
const cors = require('cors')
const app = express();
app.use(express.json()); //add allow body parames

app.use(cors({
    origin: "*"
}))

app.get('/',(req, res) => {
    res.send('Hello first express')
})

require('./src/routes/customer.route')(app)
require('./src/routes/category.route')(app)
require('./src/routes/product.route')(app)
require('./src/routes/brand.route')(app)
require('./src/routes/address.route')(app)
require('./src/routes/cart.route')(app)
require('./src/routes/order.route')(app)
require('./src/routes/payment_method.route')(app)
require('./src/routes/order_status.route')(app)
app.listen(8081, () => {
    console.log("http://localhost:8081");
})