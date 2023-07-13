const db = require('../config/db.config')

const create  = (req, res) => {
    var body = req.body
    var {category_id, brand_id, name, price, quantity, discount, description, image} = body
    var message = {}

    if(category_id == null || category_id == ""){
        message.category_id = "category_id is required"
    }
    if (brand_id == null || brand_id == ""){
        message.brand_id = "brand_id is required"
    }
    if (name == null || name == ""){
        message.name = "name is required"
    }
    if(Object.keys(message).length>0){
        res.json({
            err: true,
            message: message
        })
        return
    }
    
    var sqlStatement = 'INSERT INTO `product` (category_id, brand_id, name, price, quantity, discount, description, image) VALUES(?,?,?,?,?,?,?,?)'
    var param = [category_id, brand_id, name, price, quantity, discount, description, image]
    db.query(sqlStatement, param, (err, rows) => {
        if(err){
            res.json({
                err: true,
                meesage: err
            })
        }
        else{
            res.json({
                product: "product created successfully"
            })
        }
        
    })
    
} 

const getAll  = (req, res) => {
    var sql = 'SELECT * FROM product '
    db.query(sql, (err, rows) => {
        if (err) {
            res.json({
                err: true,
                meesage: err
            })
        }
        else{
            res.json({
                products: rows
            })
        }
        
    })
    
}

const getOne  = (req, res) => {
    var id = req.params.id
    var sqlStatement = 'SELECT * FROM product WHERE product_id = ?'
    var param = [id]
    db.query(sqlStatement, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                meesage: err
            })
        }
        else{
            res.json({
                products: row
            })
        }
    })
    
}

const update  = (req, res) => {
    var body = req.body
    var {product_id,category_id, brand_id, name, price, discount, description, image} = body
    var message = {}

    if(category_id == null || category_id == ""){
        message.category_id = "category_id is required"
    }
    if (brand_id == null || brand_id == ""){
        message.brand_id = "brand_id is required"
    }
    if (name == null || name == ""){
        message.name = "name is required"
    }
    if(Object.keys(message).length>0){
        res.json({
            err: true,
            message: message
        })
        return
    }
    
    var sqlStatement = 'UPDATE `product` SET category_id = ?, brand_id = ?, name= ?, price = ?, discount = ?, description = ?, image = ? WHERE product_id = ?'
    var param = [category_id, brand_id, name, price, discount, description, image, product_id]
    db.query(sqlStatement, param, (err, rows) => {
        if(err){
            res.json({
                err: true,
                meesage: err
            })
        }
        else{
            res.json({
                m: "product update successfully"
            })
        }
        
    })
    
} 

const remove  = (req, res) => {
    var id = req.params.id
    var sql = "DELETE FROM product WHERE product_id = ?"
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