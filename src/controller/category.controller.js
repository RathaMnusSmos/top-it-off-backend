const db = require('../config/db.config');

const getAll = (req, res) =>{
    var sql = "SELECT * FROM category"
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
    var sql = "SELECT * FROM category WHERE category_id = ?"
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
    var{name, description,image} = body
    if(name == null || name == ""){
        res.json({
            message: 'name is required'
        })
    }
    var queryStatment = 'INSERT INTO category (name, description, image) VALUES (?, ?, ?)'
    var param = [name, description, image]
    db.query(queryStatment, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "category created successfully"
            })
        }
        
    })
    
}
const update = (req, res) =>{
    var {id, name, description, image} = req.body
    if(name == null || name == ""){
        res.json({
            message: 'name is required'
        })
        return
    }
    else if (id == null || id == ""){
        res.json({
            message: 'id is required'
        })
        return
    }
    var sql = 'UPDATE category SET name = ?, description = ?, image = ?  WHERE category_id = ? '
    var param = [name, description, image, id]
    db.query(sql, param, (err, row) =>{
        if(err){
            res.json({
                err: true,
                message: err
            })
        }
        else{
            res.json({
                message: "updated category is successfully updated",
                category: row
            })
        }
    })

}
const remove = (req, res) =>{
    var id = req.params.id
    var sql = "DELETE FROM category WHERE category_id = ?"
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