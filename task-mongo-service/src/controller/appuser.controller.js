const AppUser = require('../model/appuser.model');
const constants = require('../config/constants');

exports.appusers = function (req, res) {
    AppUser.find({"Active":"true"}, function (err, appusers) {
        if (err) res.send(err);
        res.send(appusers);
    })
};

exports.appuser_create = function(req, res){
    let appuser = new AppUser({
        FirstName : req.body.FirstName,
        LastName : req.body.LastName,
        EmployeeId: req.body.EmployeeId
    })

    appuser.save(function (err) {
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

exports.appuser_update = function(req, res){
    let appuser = {
    FirstName : req.body.FirstName,
    LastName : req.body.LastName,
    EmployeeId: req.body.EmployeeId
    };

    AppUser.updateOne({ _id: req.params.id }, appuser, function (err, appuser) {
        if (err) {            
            res.send(err)
        }
        if (!appuser) { errorHandler(res, "Appuser Not Found"); }
        else {
            return res.status(200).send({
                success: true
            });
        }
    })
}

exports.appuser_delete = function(req, res){
    
    let appuser = {
        Active: false
    }
    AppUser.updateOne({_id: req.params.id}, appuser, function (err, appuser) {

        console.log(err,appuser);
        if (err) res.send(err);
        if (!appuser) { errorHandler(res, "Appuser Not Found"); }
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