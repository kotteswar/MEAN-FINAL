
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    Project: {type: String, unique:true, required:true },
    Task : {type: String, unique:true, required:true },
    Priority : {type: Number },
    ParentTask: {type: String, default: ""},
    StartDate: { type: Date, default: Date.now },
    EndDate: { type: Date, default: Date.now },
    User: {type: String, unique:true, required:true },
    Active: {type: String, default: true}
});

module.exports = mongoose.model('Task', taskSchema);