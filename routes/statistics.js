// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com',
  user     : 'welovedope',
  password : 'dope420420',
  database : 'cis550project',
  multipleStatements: true
});


// accumulate results for different statistics from doping incidents
// send accumulated results to client
// res = HTTP result object sent back to the client
function load_queries(res) {
    var per_sport = "SELECT SQL_CACHE sport, COUNT(*) as number_of_incidents FROM doping_athletes GROUP BY sport ORDER BY number_of_incidents DESC;";
    var per_sport_gender = "SELECT SQL_CACHE sport, SUM(gender='Female') as num_female, SUM(gender='Male') as num_male FROM doping_athletes GROUP BY sport;";
    var per_country = "SELECT SQL_CACHE origin_country, COUNT(*) as number_of_incidents FROM doping_athletes GROUP BY origin_country ORDER BY number_of_incidents DESC;";
    var per_drug = "SELECT SQL_CACHE banned_substance, COUNT(*) as number_of_incidents FROM doping_athletes GROUP BY banned_substance ORDER BY number_of_incidents DESC;";
    var per_year =  "SELECT SQL_CACHE year, COUNT(*) as number_of_incidents FROM doping_athletes GROUP BY year ORDER BY number_of_incidents DESC;";
    var per_gender = "SELECT SQL_CACHE SUM(gender='Female') as num_female, SUM(gender='Male') as num_male FROM doping_athletes;";
    var avg_incidents = "SELECT SQL_CACHE origin_country, AVG(sub.num_inc) AS number_of_incidents FROM (SELECT origin_country, COUNT(*) AS num_inc FROM doping_athletes GROUP BY origin_country, year) sub GROUP BY origin_country ORDER BY number_of_incidents DESC;";

    connection.query(per_sport + per_sport_gender + per_country + per_drug
        + per_year + per_gender + avg_incidents, function(err, results) {
        if (err) console.log(err);
        else {
            res.render('statistics.jade',
               { title: "Choose a category to order the statistics",
                 per_sport: results[0],
                 per_sport_gender: results[1],
                 per_country: results[2],
                 per_drug: results[3],
                 per_year: results[4],
                 per_gender: results[5],
                 avg_incidents: results[6] }
            );
        }
    });
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	load_queries(res);
};
