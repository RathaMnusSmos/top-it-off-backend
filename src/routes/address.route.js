const contr = require('../controller/address.controller')

const address = (app) =>{

    app.get('/api/address/getAll', contr.getAll)
    app.get('/api/address/getOne/:id', contr.getOne)
    app.post('/api/address/create', contr.create)
    app.put('/api/address/update', contr.update)
    app.delete('/api/address/delete/:id', contr.remove)
}

module.exports = address