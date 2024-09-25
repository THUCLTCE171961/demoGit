const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const JWT = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
const AccountModel = require('./connect')

var checkStudent = (req, res, next) => {
    var role = req.data.role
    console.log(role)
    if (role === 'student' || role === 'leader' || role === 'manager') {
        next()
    } else {
        res.json('NOT PERRMISSION')
    }
}

var checkLeader = (req, res, next) => {
    var role = req.data.role
    console.log(role)
    if (role === 'leader' || role === 'manager') {
        next()
    } else {
        res.json('NOT PERRMISSION')
    }
}

var checkManager = (req, res, next) => {
    var role = req.data.role
    if (role === 'manager') {
        next()
    } else {
        res.json('NOT PERRMISSION')
    }
}

var checkLogin = (req, res, next) => {
    try {
        var token = req.cookies.token
        var idUser = JWT.verify(token, 'mk')
        AccountModel.findOne({
            _id: idUser
        })
            .then(data => {
                if (data) {      
                    req.data = data
                    next()
                } else {
                    res.join('NOT PERMISSION')
                }
            })
            .catch(err => {
                return res.redirect('/login');
            })
    } catch (error) {
        console.log(error)
        res.status(500).json('Token khong hop le')
    }
}

module.exports = { checkLogin, checkStudent, checkLeader, checkManager };