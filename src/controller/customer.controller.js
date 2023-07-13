const db = require('../config/db.config');
const bycript = require('bcrypt')
const create = (req, res) => {
    //parameter (query, params, body)

    //#query parameter 
    //ex: http://localhost:8080/api/costumer/get-list?name=dara (name is key, dara is value)

    //#params parameter   params route is route in url  
    //ex: http://localhost:8080/api/costumer/get-list/:id (id is key) //need declared in route
    //ex: http://localhost:8080/api/costumer/get-list/123 // => req.params.id 

    //#body parameter
    //ex: http://localhost:8080/api/costumer/get-list

    //     var queryParams = req.query
    //     var bodyParams = req.body
    // res.json({
    //     queryParams: queryParams,
    //     bodyParams: bodyParams
    // })


    var body = req.body;
    var email = body.email
    var { firstname, lastname, gender, phone } = req.body
    var message = {}

    var password = bycript.hashSync(body.password, 10)
    var sqlStatement = "INSERT INTO `customer_tbl` (firstname, lastname, gender, phone, email, password) VALUES (?, ?, ?, ?, ?, ?);"


    if (firstname == null || firstname == "") {
        message.firstname = "firstname is required"
    }
    if (lastname == null || lastname == "") {
        message.lastname = "lastname is required"
    }
    if (gender == null || gender == "") {
        message.gender = "gender is required"
    }
    if (phone == null || phone == "") {
        message.phone = "phone is required"
    }
    if (email == null || email == "") {
        message.email = "email is required"
    }
    if (password == null || password == "") {
        message.password = "password is required"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            err: true,
            message: message
        })
        return
    }
    db.query("SELECT * FROM customer_tbl WHERE email = ?", [email], (err, row) => {
        if (!err) {
            if (row.length > 0) {
                res.json({
                    message: "email is already"
                })
            }
            else {
                var paramInsert = [firstname, lastname, gender, phone, email, password]
                db.query(sqlStatement, paramInsert, (err, row) => {
                    if (err) {
                        res.json({
                            err: true,
                            message: err
                        })
                    }
                    else {
                        res.json({
                            message: "success create",
                            data: row
                        })
                    }
                })
            }
        }
    })




}

const getList = (req, res) => {
    // res.json({
    //     list_customers: listCustomers,
    //     total_records: listCustomers.length
    // })
    //db.query("sql statement", ()=>{})
    db.query("SELECT * FROM customer_tbl;", (err, row) => {
        if (err) {
            res.json({
                err: true,
                message: err
            })
        }
        else {
            res.json({
                users: row
            })
        }
    })

}

const getOne = (req, res) => {
    //#with query parameter
    // var id = req.query.id;
    // var listTmp = listCustomers.filter((item, index) => item.id == id)
    // res.json({
    //     list_customer : listTmp
    // })

    //with params paramenter
    var id = req.params.id
    var sqlStatement = "SELECT * FROM customer_tbl WHERE customer_id = ?"
    var param = [id]
    db.query(sqlStatement, param, (err, row) => {
        if (err) {
            res.json({
                err: true,
                message: err
            })
        }
        else {
            res.json({
                user: row
            })
        }
    })


}
const update = (req, res) => {
    var body = req.body
    var password = bycript.hashSync(body.password, 10)
    var sqlStatement = "UPDATE customer_tbl SET firstname = ?, lastname = ?, gender = ?, phone = ?, email = ?, password = ? WHERE customer_id = ? "
    var pramm = [body.firstname, body.lastname, body.gender, body.phone, body.email, password, body.id]
    db.query(sqlStatement, pramm, (err, row) => {
        if (err) {
            res.json({
                err: true,
                message: err
            })
        }
        else {
            res.json({
                message: "update successfully",
                data: row
            })
        }
    })
}
const remove = (req, res) => {
    var id = req.params.id
    var sqlStatement = "DELETE  FROM customer_tbl WHERE customer_id = ? "
    var param = [id]

    db.query(sqlStatement, param, (err, row) => {
        if (err) {
            res.json({
                err: true,
                message: err
            })
        }
        else {
            res.json({
                message: "delete successfully"
            })
        }
    })
}


const login = (req, res) => {
    
    var { password, email } = req.body
    var message = {}
    if (email == null || email == "") {
        message.email = "email is required"
    }
    if (password == null || password == "") {
        message.password = "password is required"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            err: true,
            message: message
        })
        return
    }

    db.query("SELECT * FROM customer_tbl WHERE email = ?", [email], (err, row) => {
        if (!err) {
            if (row.length == 0) {
                res.json({
                    error: true,
                    messages: {
                        error: true,
                        email: "email does not exist"
                    }
                })
            }
            else {
                var user = row[0]
                var passwordDb = user.password
                var isCorrectPassword = bycript.compareSync(password, passwordDb)
                if (isCorrectPassword) {
                    res.json({
                        isSuccess: true,
                        message: "Login Successfull",
                        user: user
                    })
                }
                else {
                    res.json({
                        isSuccess: false,
                        error: true,
                        message: "Login fail",
                        messages: {
                            password: "Password incorrect!"
                        }
                    })
                }
            }
        }
    })

}

module.exports = {
    create,
    getList,
    getOne,
    update,
    remove,
    login
}



