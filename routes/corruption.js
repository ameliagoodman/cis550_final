var AWS = require('aws-sdk');
var async = require('async');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com',
  user     : 'welovedope',
  password : 'dope420420',
  database : 'cis550project',
  multipleStatements: true
});
AWS.config.loadFromPath('./config.json');

if (!AWS.config.credentials || !AWS.config.credentials.accessKeyId)
	throw 'Need to update config.json to specify your access key!';

var db = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "Corruption"
};

var corruptionOverall;
var yearOne;
var yearTwo;
var yearThree;
var yearFour;
var yearFive;
var yearSix;

function query_db(res) {
	db.scan(params, function(err, data) {
      if (err){
        console.log(err, err.stack);
      }
      else {
        data.Items.sort(function (a,b) {
          var x = a.country;
          var y = b.country;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        corruptionOverall = data.Items;

        query_1(res, data.Items);
      }
    });
}

function query_1(res, items1) {
  db.scan(params, function(err, data) {
    if (err){
        console.log(err, err.stack);
      }
      else {
        data.Items.sort(function (a,b) {
          var x = a.ranking[1995];
          var y = b.ranking[1995];
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        query_2(res, items1, data.Items);
    }
  });
}

function query_2(res, items1, items2) {
  db.scan(params, function(err, data) {
    if (err){
        console.log(err, err.stack);
      }
      else {
        data.Items.sort(function (a,b) {
          var x = a.ranking[1996];
          var y = b.ranking[1996];
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        query_3(res, items1, items2, data.Items);
    }
  });
}

function query_3(res, items1, items2, items3) {
  db.scan(params, function(err, data) {
    if (err){
        console.log(err, err.stack);
      }
    else {
      data.Items.sort(function (a,b) {
        var x = a.ranking[2000];
        var y = b.ranking[2000];
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      yearThree = data.Items;
      query_4(res, items1, items2, items3, data.Items);
    }
  });
}

function query_4(res, items1, items2, items3, items4) {
  db.scan(params, function(err, data) {
    if (err){
        console.log(err, err.stack);
      }
    else {
      data.Items.sort(function (a,b) {
        var x = a.ranking[2004];
        var y = b.ranking[2004];
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      yearFour = data.Items;
      query_5(res, items1, items2, items3, items4, data.Items);
    }
  });
}

function query_5(res, items1, items2, items3, items4, items5) {
  db.scan(params, function(err, data) {
    if (err){
        console.log(err, err.stack);
    }
    else {
      data.Items.sort(function (a,b) {
        var x = a.ranking[2008];
        var y = b.ranking[2008];
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      yearFive = data.Items;
      query_6(res, items1, items2, items3, items4, items5, data.Items);
    }
  });
}

function query_6(res, items1, items2, items3, items4, items5, items6) {
  db.scan(params, function(err, data) {
    if (err){
        console.log(err, err.stack);
      }
      else {
        data.Items.sort(function (a,b) {
          var x = a.ranking[2015];
          var y = b.ranking[2015];
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        query_sql(res,  items1, items2, items3, items4, items5, items6, data.Items);
    }

  });

}

function query_sql(res, items1, items2, items3, items4, items5, items6, items7) {
  var query2009 = "SELECT origin_country, year, count(*) as num_incidents FROM doping_athletes WHERE year>2008 AND origin_country=\'";
  var query2005 = "SELECT origin_country, year, count(*) as num_incidents FROM doping_athletes WHERE year>2004 AND year<2009 AND origin_country=\'";
  var query2001 = "SELECT origin_country, year, count(*) as num_incidents FROM doping_athletes WHERE year>2000 AND year<2005 AND origin_country=\'";
  var query1997 = "SELECT origin_country, year, count(*) as num_incidents FROM doping_athletes WHERE year>1995 AND year<2001 AND origin_country=\'";
  var query1995 = "SELECT origin_country, year, count(*) as num_incidents FROM doping_athletes WHERE year>1990 AND year<1996 AND origin_country=\'";
  var allQueries2009 = "";
  var allQueries2005 = "";
  var allQueries2001 = "";
  var allQueries1997 = "";
  var allQueries1995 = "";

  for (var key in corruptionOverall) {
    allQueries2009 += query2009 + corruptionOverall[key].country + "\'; ";
    allQueries2005 += query2005 + corruptionOverall[key].country + "\'; ";
    allQueries2001 += query2001 + corruptionOverall[key].country + "\'; ";
    allQueries1997 += query1997 + corruptionOverall[key].country + "\'; ";
    allQueries1995 += query1995 + corruptionOverall[key].country + "\'; ";
  }
  connection.query(allQueries2009 + allQueries2005 + allQueries2001 + allQueries1997 + allQueries1995, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      var years = {
        'year15':[],
        'year08':[],
        'year04':[],
        'year00':[],
        'year96':[]
      };
      for(var i = 0; i < rows.length; i++) {
        var yearToCountry = {};
        if (rows[i][0].origin_country != null) {
          yearToCountry['country'] = [rows[i][0].origin_country]
          yearToCountry['num'] = rows[i][0].num_incidents;
          var year = rows[i][0].year;


          if (year>2008) {
            years['year15'].push(yearToCountry);
          } else if (year>2004 && year <2009) {
            years['year08'].push(yearToCountry);
          } else if (year>2000 && year<2005) {
            years['year04'].push(yearToCountry);
          } else if (year>1995 && year<2001) {
            years['year00'].push(yearToCountry);
          } else {
            years['year96'].push(yearToCountry);
          }
        }
      };
      console.log(years);
      res.render('corruption.jade', {title: "Corruption Data",
          "results":  items1,
          "yearOne": items2,
          "yearTwo": items3,
          "yearThree": items4,
          "yearFour": items5,
          "yearFive": items6,
          "yearSix": items7,
          "sql": years
        });
    }
  });
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res);
};
