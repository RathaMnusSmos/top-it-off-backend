const contr = require('../controller/order_status.controller')

const orderStatus = (app) =>{

    app.get('/api/order-status/getAll', contr.getAll)
    app.get('/api/order-status/getOne/:id', contr.getOne)
    app.post('/api/order-status/create', contr.create)
    app.put('/api/order-status/update', contr.update)
    app.delete('/api/order-status/delete/:id', contr.remove)
}

module.exports = orderStatus