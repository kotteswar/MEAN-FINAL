const Project = require('../model/project.model');
const constants = require('../config/constants');

exports.projects = function (req, res) {
    Project.find({"Active":"true"}, function (err, projects) {
        if (err) res.send(err);
        res.send(projects);
    })
};

exports.project_create = function(req, res){
    let project = new Project({
        Project : req.body.Project,
        Priority : req.body.Priority,
        Manager: req.body.Manager,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate
    })
    
    project.save(function (err) {
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

exports.project_update = function(req, res){
    let project = {
        Project : req.body.Project,
        Priority : req.body.Priority,
        Manager: req.body.Manager,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate
    };

    Project.updateOne({ _id: req.params.id }, project, function (err, project) {
        if (err) {            
            res.send(err)
        }
        if (!project) { errorHandler(res, "Appuser Not Found"); }
        else {
            return res.status(200).send({
                success: true
            });
        }
    })
}

exports.project_delete = function(req, res){
    
    let project = {
        Active: false
    }
    Project.updateOne({_id: req.params.id}, project, function (err, project) {

        console.log(err,project);
        if (err) res.send(err);
        if (!project) { errorHandler(res, "Appuser Not Found"); }
        else {
            return res.status(200).send({
                success: true
            });
        }
    })
}

function errorHandler(res, msg) {
    return res.status(403).send({
        success: false,
        message: msg
    });
}