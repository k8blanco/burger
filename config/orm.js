//Import connection
var connection = require("../config/connection.js");

//Helper functions
function questionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(object) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in object) {
        var value = object[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(object, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//Object for all SQL statement functions
var orm = {
    //function to display ALL burgers at start
    selectAll: function (tableName, cb) {
        let queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
            console.log("'all' queryString: ", queryString);
        });
    },
    //function to CREATE new burger on Add Burger button click
    insertOne: function (tableName, column, values, cb) {
        let queryString = "INSERT INTO " + tableName;

        queryString += " (";
        queryString += column.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarks(values.length);
        queryString += ") ";

        connection.query(queryString, values, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
            console.log("'Create' queryString: ", queryString);
        });
    },

    //function to UPDATE undevoured burgers on DEVOUR button click
    updateOne: function(tableName, objColVals, condition, cb) {
        let queryString = "UPDATE " + tableName;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

   
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
            console.log("'Update' queryString: ", queryString);
        });
    }
};



// Export the orm object for the model
module.exports = orm;