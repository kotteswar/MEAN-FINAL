
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
    Project : {type: String, unique:true, required:true },
    Priority : {type: Number, unique:true, required:true },
    Manager: {type: String, unique:true, required:true },
    StartDate: { type: Date, default: Date.now },
    EndDate: { type: Date, default: Date.now },
    Active: {type: String, default: true}
});

module.exports = mongoose.model('Project', projectSchema);