// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com',
  user     : 'welovedope',
  password : 'dope420420',
  database : 'cis550project',
  multipleStatements: true
});

/////
// Query the mysql database, and return all atheltes from the country entered
//
// res = HTTP result object sent back to the client
// country = origin country of athletes to query for
function query_db(res, country) {
    query0 = "SELECT DISTINCT SQL_CACHE origin_country as name FROM doping_athletes ORDER BY name;";
    query1 = "SELECT SQL_CACHE * FROM doping_athletes";
	if (country) query1 = query1 + " WHERE origin_country='" + country + "'";
	connection.query(query0 + query1, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			output_persons(res, country, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_persons(res,country,results) {
    if (country != "") {
        res.render('doping_athletes.jade',
           { title: "Athletes caught using performance inhancing drugs from " + country,
             countries: results[0],
             results: results[1] }
      );
    } else {
        res.render('doping_athletes.jade',
           { title: "Athletes caught using performance inhancing drugs from all countries",
             countries: results[0],
             results: results[1] }
        );
    }

}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
