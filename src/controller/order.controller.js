const db = require('../config/db.config');
const {isEmptyOrNull} = require('../config/service')
const getAll = (req, res) =>{
    var sql = "SELECT * FROM order"
    db.query(sql, (err, rows) =>{
        if(err){
            res.json({
                err : true,
                message: err 
            })
        }
        else{
            res.json({
                category : rows
            })
        }
    })
    
}
const getorderByCustomer = (req, res) =>{
    var id = req.params.id
    var sql = "SELECT cart.cart_id, cart.quantity, product.name, product.price"+
    "FROM cart"+
    "INNER JOIN product on cart.product_id = product.product_id"+
    "WHERE cart.customer_id = ?"
    var param = [id]
    db.query(sql,param, (err, rows) =>{
        if(err){
            res.json({
                err : true,
                message: err 
            })
        }
        else{
            res.json({
                category : rows
            })
        }
    })
}
const getOne = (req, res) =>{
    var id = req.params.id
    var sql = "SELECT * FROM order WHERE order_id = ?"
    var param = [id]
    db.query(sql, param, (err, rows) =>{
        if(err){
            res.json({
                err : true,
                message: err
            })
        }
        else{
            res.json({
                cart: rows
            })
        }
    })
}

const create = (req, res) =>{
    var body = req.body
    var{customer_id, firsname, lastname, tel, email, address, comment, total_order, payment_method, order_status} = body

    var message ={}
    
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id is required"
    }
    if (isEmptyOrNull(firsname)){
        message.firsname = "firsname is required"
    }
    if (isEmptyOrNull(lastname)){
        message.lastname = "lastname is required"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "tel is required"
    }
    if (isEmptyOrNull(address)){
        message.address = "address is required"
    }
    if (isEmptyOrNull(total_order)){
        message.total_order = "total_order is required"
    }
    if (isEmptyOrNull(payment_method)){
        message.payment_method = "payment_method is required"
    }
    if (isEmptyOrNull(order_status)){
        message.order_status = "order_status is required"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var queryStatment = 'INSERT INTO cart (customer_id, firsname, lastname, tel, email, address, comment, total_order, payment_method, order_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    var param = [customer_id, firsname, lastname, tel, email, address, comment, total_order, payment_method, order_status]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            //add data to order product base on user cart that order
              // order_id, name, price, quantity, total

            //select customer cart (data on cart tha user add to their cart) by customer_id for insert to oder-product
            var sql = "SELECT p.name, p.price, c.quantity, (p.price * c.quantity) as total " +
            "FROM cart c "+
            "INNER JOIN product p on c.product_id = p.product_id" +
            "WHERE c.customer_id = ? "
            db.query(sql, [customer_id], (err1, rows1) => {
                if(!err1){
                    var data = rows1
                    var sqlOrderProduct = "INSERT INTO order_product (order_id, name, price, quantity, total) VALUES (?,?,?,?,?)"
                    data.map((item, index) =>{
                        var params = [row.insert_id, item.name, item.price, item.quantity, item.total]
                        db.query(sqlOrderProduct,params, (err2, rows2) =>{
                            if(!err2){
                                res.json({
                                    message: "You have Order Successfully"
                                })
                            }
                            else{
                                res.json({
                                    err: true,
                                    message: err2
                                })
                            }
                        })
                    })

                }
            })

            res.json({
                message: "You have Order Successfully, Thanks!"
            })
        }
        
    })
    
}
const update = (req, res) =>{
    var body = req.body
    var{order_id, order_status} = body

    var message ={}
    if(isEmptyOrNull(order_id)){
        message.order_id = "order_id is required"
    }
    if(isEmptyOrNull(order_status)){
        message.order_status = "order_status is required"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var queryStatment = 'UPDATE cart SET order_status = ? WHERE order_id = ?'
    var param = [order_status, order_id]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "oreder status update successfully"
            })
        }
        
    })

}
const remove = (req, res) =>{
    var id = req.params.id
    var sql = "DELETE FROM order WHERE order_id = ?"
    var param = [id]
    db.query(sql, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "delete order successfully"
            })
        }
    })
    
}

module.exports = {
    getorderByCustomer,
    getAll,
    getOne,
    create,
    update,
    remove
} 