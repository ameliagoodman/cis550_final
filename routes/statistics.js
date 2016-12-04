// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com',
  user     : 'welovedope',
  password : 'dope420420',
  database : 'cis550project'
});

var results = {}

/////
// Query the mysql database, and return all relevant doping statistics
//
// res = HTTP result object sent back to the client
function query_db(res) {
    output_persons(res, "", results);
}

// What sport has highest number of doping incidents?
// Returns in RowDataPacket{sport: 'sport', number_of_incidents: #}
function per_sport() {
    query = "SELECT sport, COUNT(*) as number_of_incidents FROM doping_athletes GROUP BY sport ORDER BY number_of_incidents DESC;";
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            add_results("per_sport", rows);
        }
    });
}

function per_sport_female() {
    query = "SELECT sport, COUNT(*) as number_of_incidents FROM doping_athletes WHERE gender = 'Female' GROUP BY sport ORDER BY number_of_incidents DESC;";
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            add_results("per_sport_female", rows);
        }
    });

}

function per_sport_male() {
    query = "SELECT sport, COUNT(*) as number_of_incidents FROM doping_athletes WHERE gender = 'Male' GROUP BY sport ORDER BY number_of_incidents DESC;";
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            add_results("per_sport_male", rows);
        }
    });
}

function per_country() {
    query = "SELECT origin_country, COUNT(*) as number_of_incidents FROM doping_athletes GROUP BY origin_country ORDER BY number_of_incidents DESC;";
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            add_results("per_country", rows);
        }
    });
}

function per_drug() {
    query = "SELECT banned_substance, COUNT(*) as number_of_incidents FROM doping_athletes GROUP BY banned_substance ORDER BY number_of_incidents DESC;";
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            add_results("per_drug", rows);
        }
    });
}

// adds rows from query to result json
function add_results(title, rows) {
    results[title] = rows;
}

// ///
// send accumulated results to client
// res = HTTP result object sent back to the client
function output_results(res) {
    res.render('statistics.jade',
           { title: "Choose a category to order the statistics:",
             results: results }
      );
}


/////
// This is what's called by the main app
exports.do_work = function(req, res){
	per_sport();
    per_sport_female();
    per_sport_male();
    per_country();
    per_drug();
    output_results(res);
};
