const db = require('../config/db.config');
const {isEmptyOrNull} = require('../config/service')
const getAll = (req, res) =>{
    var sql = "SELECT * FROM address"
    db.query(sql, (err, rows) =>{
        if(err){
            res.json({
                err : true,
                message: err 
            })
        }
        else{
            res.json({
                address : rows
            })
        }
    })
    
}
const getOne = (req, res) =>{
    var id = req.params.id
    var sql = "SELECT * FROM address WHERE address_id = ?"
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
                addresss: rows
            })
        }
    })
}

const create = (req, res) =>{
    var body = req.body
    var{customer_id, province_id,firstname, lastname, tel, email, address_discription} = body

    var message ={}
    
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id is required"
    }
    if (isEmptyOrNull(province_id)){
        message.province_id = "province_id is required"
    }
    if (isEmptyOrNull(firstname)){
        message.firstname = "firstname is required"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "lastname is required"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "tel is required"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var queryStatment = 'INSERT INTO address (customer_id, province_id,firstname, lastname, tel, email, address_discription) VALUES (?, ?, ?, ?, ?, ?, ?)'
    var param = [customer_id, province_id,firstname, lastname, tel, email, address_discription]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "address created successfully"
            })
        }
        
    })
    
}
const update = (req, res) =>{
    var body = req.body
    var{address_id,customer_id, province_id,firstname, lastname, tel, email, address_discription} = body

    var message ={}
    if(isEmptyOrNull(address_id)){
        message.address_id = "address_id is required"
    }
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id is required"
    }
    if (isEmptyOrNull(province_id)){
        message.province_id = "province_id is required"
    }
    if (isEmptyOrNull(firstname)){
        message.firstname = "firstname is required"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "lastname is required"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "tel is required"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return
    }
    var queryStatment = 'UPDATE address SET customer_id = ?, province_id = ?, firstname = ?, lastname = ?, tel = ?, email = ?, address_discription = ? WHERE address_id = ?'
    var param = [customer_id, province_id,firstname, lastname, tel, email, address_discription , address_id]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "address update successfully"
            })
        }
        
    })

}
const remove = (req, res) =>{
    var id = req.params.id
    var sql = "DELETE FROM address WHERE address_id = ?"
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
                message: "delete address successfully"
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