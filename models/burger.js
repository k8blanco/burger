var orm = require("../config/orm.js");

var burgerModel = {
    //ALL function
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    //CREATE function
    insertOne: function(column, values, cb) {
        orm.insertOne("burgers", column, values, function(res) {
            cb(res);
        });
    },
    //UPDATE function
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    }
};

//Export the database functions for the controller (burgers_controller.js)
module.exports = burgerModel;