const db = require('../config/db.config');
const {isEmptyOrNull} = require('../config/service')
const getAll = (req, res) =>{
    var sql = "SELECT * FROM order_status"
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
const getOne = (req, res) =>{
    var id = req.params.id
    var sql = "SELECT * FROM order_status WHERE order_status_id = ?"
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
                category: rows
            })
        }
    })
}
const create = (req, res) =>{
    var body = req.body
    var{name, code} = body
    if (isEmptyOrNull(name)){
        message.name = "name is required"
    }
    if (isEmptyOrNull(code)){
        message.code = "code is required"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var queryStatment = 'INSERT INTO order_status (name, code) VALUES (?, ?)'
    var param = [name, code]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "order status created successfully"
            })
        }
        
    })
    
}
const update = (req, res) =>{
    var body = req.body
    var{name, code, status, order_status_id} = body
    if (isEmptyOrNull(order_status_id)){
        message.order_status_id = "order_status_id is required"
    }
    if (isEmptyOrNull(name)){
        message.name = "name is required"
    }
    if (isEmptyOrNull(code)){
        message.code = "code is required"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var sql = 'UPDATE order_status SET name = ?, code = ?, status = ? WHERE payment_method_id = ? '
    var param = [name, code, status, payment_method_id]
    db.query(sql, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "updated order status is successfully updated",
                category: row
            })
        }
    })

}
const remove = (req, res) =>{
    var id = req.params.id
    var sql = "DELETE FROM order_status WHERE order_status_id = ?"
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
                message: "delete category successfully"
            })
        }
    })
    
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
} 