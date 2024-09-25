const AccountModel = require('../models/connect')

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(function (username, password, done) {
    AccountModel.findOne({
        username: username,
        password: password
    })
        .then(data => {
            if (!data) {
                done(null, false)
            } else {
                done(null, data)
            }
        })
        .catch(err => {
            done(err)
        })
}));

var login = ((req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return res.status(500).json('loi server')
        }
        if (!user) {
            return res.json('Username or password khong hop le')
        }

        JWT.sign({ _id: user._id }, 'mk', function (err, token) {
            if (err) { return res.status(500).json('loi server') } else {
                // console.log('Generated token:', token);
                res.cookie('token', token)
                return res.json(token)
            }
        })
    }
)(req, res, next);
})

module.exports = login