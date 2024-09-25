const express = require('express')
const app = express()
const path = require('path')
const PAGE_SIZE = 2
var bodyParser = require('body-parser')
const JWT = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

const AccountModel = require('./models/connect')

app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
//Phân trang
app.get('/page', (req, res, next) => {
    var page = req.query.page
    if (page) {
        page = parseInt(page)
        if (page < 1) {
            page = 1
        }
        var skipNumber = (page - 1) * PAGE_SIZE
        AccountModel.find({}).skip(skipNumber).limit(PAGE_SIZE)
            .then(data => {
                AccountModel.countDocuments({}).then((total) => {
                    var tongsoPage = Math.ceil(total / PAGE_SIZE)
                    res.json({
                        total: total,
                        tongsoPage: tongsoPage,
                        data: data
                    })

                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        AccountModel.find({})
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json('Loi server')
            })
    }

})

app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'login.html'))
})



var accountRouter = require('./router/account')

app.use('/api/account/', accountRouter)





app.listen(process.env.PORT, function () { })