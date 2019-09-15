
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appuserSchema = new Schema({
    FirstName : {type: String, unique:true, required:true },
    LastName : {type: String, unique:true, required:true },
    EmployeeId : {type: String, unique:true, required:true },
    Active: {type: String, default: true}
});

module.exports = mongoose.model('AppUser', appuserSchema);