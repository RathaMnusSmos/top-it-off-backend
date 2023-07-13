const db = require('../config/db.config');
const {isEmptyOrNull} = require('../config/service')
const getAll = (req, res) =>{
    var sql = "SELECT * FROM payment_method"
    db.query(sql, (err, rows) =>{
        if(err){
            res.json({
                err : true,
                message: err 
            })
        }
        else{
            res.json({
                payment_method: rows
            })
        }
    })
    
}
const getOne = (req, res) =>{
    var id = req.params.id
    var sql = "SELECT * FROM payment_method WHERE payment_method_id = ?"
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
                payment_method: rows
            })
        }
    })
}
const create = (req, res) =>{
    var message = {}
    var body = req.body
    var{name, code, sort_order} = body
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
    var queryStatment = 'INSERT INTO payment_method (name, code, sort_order) VALUES (?, ?, ?)'
    var param = [name, code, sort_order]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "payment method created successfully"
            })
        }
        
    })
    
}
const update = (req, res) =>{
    var body = req.body
    var{name, code, status, sort_order, payment_method_id} = body
    var message = {}
    if (isEmptyOrNull(payment_method_id)){
        message.payment_method_id = "payment_method_id is required"
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
    var sql = 'UPDATE payment_method SET name = ?, code = ?, status = ?, sort_order = ? WHERE payment_method_id = ? '
    var param = [name, code, status, sort_order, payment_method_id]
    db.query(sql, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "updated payment method is successfully updated",
                category: row
            })
        }
    })

}
const remove = (req, res) =>{
    var id = req.params.id
    var sql = "DELETE FROM payment_method WHERE payment_method_id = ?"
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