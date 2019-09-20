
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    Project : {type: String},
    Priority : {type: Number},
    Manager: {type: String},
    StartDate: { type: Date, default: Date.now },
    EndDate: { type: Date, default: Date.now },
    Active: {type: String, default: true}
});

module.exports = mongoose.model('Project', projectSchema);