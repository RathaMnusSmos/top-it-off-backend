const contr = require('../controller/product.controller')
const product = (app) =>{

    app.get('/api/product/getAll', contr.getAll)
    app.get('/api/product/getOne/:id', contr.getOne)
    app.post('/api/product/create', contr.create)
    app.put('/api/product/update', contr.update)
    app.delete('/api/product/delete/:id', contr.remove)

}

module.exports = product