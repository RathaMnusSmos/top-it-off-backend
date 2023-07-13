const contr = require('../controller/category.controller')

const category = (app) =>{

    app.get('/api/category/getAll', contr.getAll)
    app.get('/api/category/getOne/:id', contr.getOne)
    app.post('/api/category/create', contr.create)
    app.put('/api/category/update', contr.update)
    app.delete('/api/category/delete/:id', contr.remove)
}

module.exports = category