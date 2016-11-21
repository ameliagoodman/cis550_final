// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com',
  user     : 'welovedope',
  password : 'dope420420',
  database : 'cis550project'
});

/////
// Query the mysql database, and return all atheltes from the country entered
//
// res = HTTP result object sent back to the client
// country = origin country of athletes to query for
function query_db(res, country) {
	query = "SELECT * FROM doping_athletes";
	if (country) query = query + " WHERE origin_country='" + country + "'";
	connection.query(query, function(err, rows, fields) {
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
	res.render('doping_athletes.jade',
		   { title: "Olympics with country " + country,
		     results: results }
	  );
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
