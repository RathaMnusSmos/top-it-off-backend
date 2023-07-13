const contr = require('../controller/cart.controller')

const cart = (app) =>{

    app.get('/api/cart/getAll', contr.getAll)
    app.get('/api/cart/getOne/:id', contr.getOne)
    app.get('/api/cart/get-cart-by-customer', contr.getCartByCustomer)
    app.post('/api/cart/create', contr.create)
    app.put('/api/cart/update', contr.update)
    app.delete('/api/cart/delete/:id', contr.remove)
}

module.exports = cart