
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    Task : {type: String, unique:true, required:true },
    Priority : {type: Number, unique:true, required:true },
    ParentTask: {type: String, default: ""},
    StartDate: { type: Date, default: Date.now },
    EndDate: { type: Date, default: Date.now },
    Active: {type: String, default: true}
});

module.exports = mongoose.model('Task', taskSchema);