var express = require("express");

var router = express.Router();

//Import the model (burger.js) to use its database functions
var burgerModel = require("../models/burger.js");

//Create all our routes and set up logic within those routes where we need it

//route to main landing page
router.get("/", function(req, res) {
    burgerModel.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log("hbsObject: ", hbsObject);
        res.render("index", hbsObject);
    });
});

//route for adding a burger
router.post("/api/burgers", function(req, res) {
    burgerModel.insertOne(["burger_name"], [req.body.name], function(result) {
        res.json({ id: result.insertId });
    });
});

//route for updating burger conditions (devoured)
router.put("/api/burgers/:id", function(req, res) {
    let condition = " id = " + req.params.id;

    burgerModel.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            //if no rows changed, then ID doesn't exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});



//Export routes for server.js to use
module.exports = router;