const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
})

userSchema.plugin(uniqueValidator,{message:'Email Already in use'});

module.exports = mongoose.model('Users',userSchema);