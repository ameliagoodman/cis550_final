/*
 * GET home page, which is specified in Jade.
 */

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com',
  user     : 'welovedope',
  password : 'dope420420',
  database : 'cis550project'
});

function get_countries(res) {
    query = "SELECT DISTINCT SQL_CACHE origin_country as name FROM doping_athletes ORDER BY name;";
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            output_countries(res, rows);
        }
    });
}

// ///
// Throw country names into select
//
// res = HTTP result object sent back to the client
// results = List object of query results
function output_countries(res,results) {
    res.render('index.jade',
           { title: "Please select a country",
             countries: results }
      );
}

exports.do_work = function(req, res){
  get_countries(res);
};
