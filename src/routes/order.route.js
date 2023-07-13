const contr = require('../controller/order.controller')

const order = (app) =>{

    app.get('/api/order/getAll', contr.getAll)
    app.get('/api/order/getOne/:id', contr.getOne)
    app.get('/api/order/get-order-by-customer', contr.getorderByCustomer)
    app.post('/api/order/create', contr.create)
    app.put('/api/order/update', contr.update)
    app.delete('/api/order/delete/:id', contr.remove)
}

module.exports = order