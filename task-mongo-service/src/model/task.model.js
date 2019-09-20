
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    Project: {type: String },
    Task : {type: String},
    Priority : {type: Number },
    ParentTask: {type: String},
    StartDate: { type: Date, default: Date.now },
    EndDate: { type: Date, default: Date.now },
    User: {type: String },
    onlyParentTask: {type: Boolean },
    Active: {type: String, default: true}
});

module.exports = mongoose.model('Task', taskSchema);