const db = require('../config/db.config');
const {isEmptyOrNull} = require('../config/service')
const getAll = (req, res) =>{
    var sql = "SELECT * FROM cart"
    db.query(sql, (err, rows) =>{
        if(err){
            res.json({
                err : true,
                message: err 
            })
        }
        else{
            res.json({
                cart : rows
            })
        }
    })
    
}
const getCartByCustomer = (req, res) =>{
    var {customer_id} = req.body
    if(isEmptyOrNull(customer_id)){
        res.json({
            error:true,
            message : "Param customer_id required!"
        })
    }
    var sql = "SELECT cart.customer_id, cart.cart_id, cart.quantity, product.name, product.price "+
    " FROM cart "+
    " INNER JOIN product ON cart.product_id = product.product_id" +
    " WHERE cart.customer_id = ?"
    db.query(sql,[customer_id],(err,rows) =>{
        if(err){
            res.json({
                err : true,
                message: err 
            })
        }
        else{
            res.json({
                cart : rows
            })
        }
    })
}
const getOne = (req, res) =>{
    var id = req.params.id
    var sql = "SELECT * FROM cart WHERE cart_id = ?"
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
    var{customer_id, product_id,quantity} = body

    var message ={}
    
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id is required"
    }
    if (isEmptyOrNull(product_id)){
        message.province_id = "product_id is required"
    }
    if (isEmptyOrNull(quantity)){
        message.firstname = "quantity is required"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var queryStatment = 'INSERT INTO cart (customer_id, product_id,quantity) VALUES (?, ?, ?)'
    var param = [customer_id, product_id,quantity]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "cart created successfully"
            })
        }
        
    })
    
}
const update = (req, res) =>{
    var body = req.body
    var{cart_id,customer_id, product_id,quantity} = body

    var message ={}
    if(isEmptyOrNull(cart_id)){
        message.address_id = "cart_id is required"
    }
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id is required"
    }
    if (isEmptyOrNull(product_id)){
        message.province_id = "product_id is required"
    }
    if (isEmptyOrNull(quantity)){
        message.firstname = "quantity is required"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var queryStatment = 'UPDATE cart SET customer_id = ?, product_id = ?, quantity = ? WHERE cart_id = ?'
    var param = [customer_id, product_id,quantity,cart_id]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "cart update successfully"
            })
        }
        
    })

}
const remove = (req, res) =>{
    var id = req.params.id
    var sql = "DELETE FROM cart WHERE cart_id = ?"
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
                message: "delete cart successfully"
            })
        }
    })
    
}

module.exports = {
    getCartByCustomer,
    getAll,
    getOne,
    create,
    update,
    remove
} 