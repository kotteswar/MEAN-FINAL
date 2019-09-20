
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appuserSchema = new Schema({
    //FirstName : {type: String, unique:true, required:true },
    FirstName : {type: String},
    LastName : {type: String},
    EmployeeId : {type: String},
    Active: {type: String, default: true}
});

module.exports = mongoose.model('AppUser', appuserSchema);