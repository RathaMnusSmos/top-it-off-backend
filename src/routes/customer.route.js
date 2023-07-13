const customerConntroller = require("../controller/customer.controller")

const customer = (app) => {
    // app.get('/api/customer/get-list', (req, res) => {
    //     res.send('Get list customer');
    // })
    // app.get('/api/customer/create', (req, res) => {
    //     res.send('Create customer');
    // })

    app.post('/api/customer/create', customerConntroller.create)
    app.get('/api/customer/get-list', customerConntroller.getList)
    app.get('/api/customer/get-one/:id', customerConntroller.getOne)
    app.put('/api/customer/update', customerConntroller.update)
    app.delete('/api/customer/delete/:id', customerConntroller.remove)
    app.post('/api/customer/login', customerConntroller.login)
}

module.exports = customer 