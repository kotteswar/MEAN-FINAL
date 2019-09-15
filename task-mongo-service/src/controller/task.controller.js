const Task = require('../model/task.model');
const constants = require('../config/constants');

exports.tasks = function (req, res) {
    Task.find({"Active":"true"}, function (err, tasks) {
        if (err) res.send(err);
        res.send(tasks);
    })
};

exports.task_create = function(req, res){
    let task = new Task({
    Task : req.body.Task,
    Priority : req.body.Priority,
    ParentTask: req.body.ParentTask,
    StartDate: req.body.StartDate,
    EndDate: req.body.EndDate
    })

    task.save(function (err) {
        if (err) {            
            res.send(err)
        }
        else {
            return res.status(200).send({
                success: true
            });
        }
    })
}

exports.task_update = function(req, res){
    let task = {
    Task : req.body.Task,
    Priority : req.body.Priority,
    ParentTask: req.body.ParentTask,
    StartDate: req.body.StartDate,
    EndDate: req.body.EndDate
    };

    Task.updateOne({ _id: req.params.id }, task, function (err, task) {
        if (err) {            
            res.send(err)
        }
        if (!task) { errorHandler(res, "Task Not Found"); }
        else {
            return res.status(200).send({
                success: true
            });
        }
    })
}

exports.task_delete = function(req, res){
    
    let task = {
        Active: false
    }
    Task.updateOne({_id: req.params.id}, task, function (err, task) {

        console.log(err,task);
        if (err) res.send(err);
        if (!task) { errorHandler(res, "task Not Found"); }
        else {
            res.send('Deleted successfully!');
        }
    })
}

function errorHandler(res, msg) {
    return res.status(403).send({
        success: false,
        message: msg
    });
}