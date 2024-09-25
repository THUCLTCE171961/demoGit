const login = require('../controllers/account_controller')
const { checkLogin, checkStudent, checkLeader, checkManager } = require('../models/account');

const express = require('express')
const router = express.Router   ()

router.post('/login', login)


router.get('/task', checkLogin, checkStudent, (req, res, next) => {
    res.json('ALL TASK')
})

router.get('/student', checkLogin, checkLeader, (req, res, next) => {
    next()
}, (req, res, next) => {
    res.json('STUDENT')
})

router.get('/leader', checkLogin, checkManager, (req, res, next) => {
    next()
}, (req, res, next) => {
    res.json('LEADER')
})


router.get('/chat', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'chatting.html'))
})

module.exports = router