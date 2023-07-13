const db = require('../config/db.config')

const getAll = (req, res) => {
    res.json({
        message: "getAll"
    })
}
const getOne = (req, res) => {
    res.json({
        message: "get One"
    })
}
const create = (req, res) => {
    res.json({
        message: "create"
    })
}
const update = (req, res) => {
    res.json({
        message: "updtae"
    })
}
const remove = (req, res) => {
    res.json({
        message: "remove"
    })
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}