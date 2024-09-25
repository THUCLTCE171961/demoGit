const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/K5-Nodemy');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: String,
    password: String,
    role: String
},{
    collection: 'Account'
})

const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;