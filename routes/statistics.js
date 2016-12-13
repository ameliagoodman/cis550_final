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
    var per_year =  "SELECT SQL_CACHE year, COUNT(*) as number_of_incidents FROM doping_athletes GROUP BY year ORDER BY year DESC;";
    var per_gender = "SELECT SQL_CACHE SUM(gender='Female') as num_female, SUM(gender='Male') as num_male FROM doping_athletes;";
    var avg_incidents = "SELECT SQL_CACHE origin_country, AVG(sub.num_inc) AS number_of_incidents FROM (SELECT origin_country, COUNT(*) AS num_inc FROM doping_athletes GROUP BY origin_country, year) sub GROUP BY origin_country ORDER BY number_of_incidents DESC;";

    connection.query(per_sport + per_sport_gender + per_country + per_drug
        + per_year + per_gender + avg_incidents, function(err, results) {
        if (err) console.log(err);
        else {
          var sport_chart_data = [['Sport', 'Number of Incidents']];
          var per_sport = results[0];
          for (var inx = 0; inx < per_sport.length; inx++) {
            var sport0 = [per_sport[inx].sport, parseInt(per_sport[inx].number_of_incidents)];
            sport_chart_data.push(sport0);
          }
          var country_chart_data = [['Country', 'Number of Incidents']];
          var per_country = results[2];
          for (var inx = 0; inx < per_country.length; inx++) {
            var country0 = [per_country[inx].origin_country, parseInt(per_country[inx].number_of_incidents)];
            country_chart_data.push(country0);
          }
          var drug_chart_data = [['Drug', 'Number of Incidents']];
          var per_drug = results[3];
          for (var inx = 0; inx < per_drug.length; inx++) {
            var drug0 = [per_drug[inx].banned_substance, parseInt(per_drug[inx].number_of_incidents)];
            drug_chart_data.push(drug0);
          }
          var year_chart_data = [['Year', 'Number of Incidents']];
          var per_year = results[4];
          for (var inx = 0; inx < per_year.length; inx++) {
            var year0 = [per_year[inx].year, parseInt(per_year[inx].number_of_incidents)];
            year_chart_data.push(year0);
          }
          var avg_country_chart_data = [['Country', 'Avg Number of Incidents']];
          var per_country_avg = results[6];
          for (var inx = 0; inx < per_country_avg.length; inx++) {
            var country1 = [per_country_avg[inx].origin_country, parseInt(per_country_avg[inx].number_of_incidents)];
            avg_country_chart_data.push(country1);
          }
            res.render('statistics.jade',
               { title: "Organize the number of doping incidents by",
                 per_sport: results[0],
                 per_sport_gender: results[1],
                 per_country: results[2],
                 per_drug: results[3],
                 per_year: results[4],
                 per_gender: results[5],
                 avg_incidents: results[6],
                 per_sport_chart: JSON.stringify(sport_chart_data),
                 per_country_chart: JSON.stringify(country_chart_data),
                 per_drug_chart: JSON.stringify(drug_chart_data),
                 per_year_chart: JSON.stringify(year_chart_data),
                 per_avg_chart: JSON.stringify(avg_country_chart_data) }
            );
        }
    });
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	load_queries(res);
};
