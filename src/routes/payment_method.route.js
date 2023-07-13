const contr = require('../controller/payment_method.controller')

const paymentMethod = (app) =>{

    app.get('/api/payment-method/getAll', contr.getAll)
    app.get('/api/payment-method/getOne/:id', contr.getOne)
    app.post('/api/payment-method/create', contr.create)
    app.put('/api/payment-method/update', contr.update)
    app.delete('/api/payment-method/delete/:id', contr.remove)
}

module.exports = paymentMethod