// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com',
  user     : 'welovedope',
  password : 'dope420420',
  database : 'cis550project'
});

/////
// Query the mysql database, and return all athletes from the country entered
//
// res = HTTP result object sent back to the client
// country = origin country of athletes to query for

function query_db(res) {
	query = "SELECT SQL_CACHE m.name, da.origin_country, c.code, m.game_location, m.sport, m.medal, m.year FROM medalist m JOIN doping_athletes da ON da.name=m.name JOIN country_codes c ON da.origin_country=c.country GROUP BY name, year;";

	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			output_persons(res, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_persons(res,results) {
	res.render('doping_medalists.jade',
		   { title: "Athletes who got caught for doping in one Olympic game and medalled in another",
		     results: results }
	  );
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
