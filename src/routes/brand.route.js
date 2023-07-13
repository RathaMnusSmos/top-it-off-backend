const contr = require('../controller/brand.controller')

const brand = (app) =>{
    app.get('/api/brand/getAll', contr.getAll)
    app.get('/api/brand/getOne/:id', contr.getOne)
    app.post('/api/brand/create', contr.create)
    app.put('/api/brand/update', contr.update)
    app.delete('/api/brand/delete/:id', contr.remove)
}

module.exports = brand