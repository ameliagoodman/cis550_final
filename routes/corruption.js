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

var paramsAll = {
    TableName : "Corruption",
};

var params1995 = {
    TableName : "Corruption",
    KeyConditionExpression: "#yr",
    ExpressionAttributeNames:{
        "#yr": "ranking[:yyyy]"
    },
    ExpressionAttributeValues: {
        ":yyyy":1995
    }
};
var params1996 = {
    TableName : "Corruption",
    KeyConditionExpression: "#year = :1996"
};
var params2000 = {
    TableName : "Corruption",
    KeyConditionExpression: "#year = :2000"
};
var params2004 = {
    TableName : "Corruption",
    KeyConditionExpression: "#year = :2004"
};
var params2008 = {
    TableName : "Corruption",
    KeyConditionExpression: "#year = :2008"
};
var params2015 = {
    TableName : "Corruption",
    KeyConditionExpression: "#year = :2015"
};


var corruptionOverall;
var year1995;
var year1996;
var year2000;
var year2004;
var year2008;
var year2015;

function sortMe(a, b) {
  var x = a.country;
  var y = b.country;
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
}

function query_all() {
	db.scan(paramsAll, function(err, data) {
      if (err){
        console.log(err, err.stack);
      }
      else {
        data.Items.sort(function (a,b) {
          return sortMe(a,b);
        });
        corruptionOverall = data.Items;
      }
    });
}

function query_1995() {
  db.scan(params1995, function(err, data) {
    if (err){
      console.log(err, err.stack);
    }
    else {
      console.log("Query succeeded.");
      data.Items.forEach(function(item) {
          console.log(" -", item.year + ": " + item);
      // });
      // data.Items.sort(function (a,b) {
      //   return sortMe(a,b);
      // });
      // year1995 = data.Items;
      });
    }
  });
}

function query_1996() {
  db.scan(params1996, function(err, data) {
    if (err){
        console.log(err, err.stack);
      }
      else {
        data.Items.sort(function (a,b) {
          return sortMe(a, b);
        });
        year1996 = data.Items;
    }
  });
}

function query_2000() {
  db.scan(params2000, function(err, data) {
    if (err){
        console.log(err, err.stack);
      }
    else {
      data.Items.sort(function (a,b) {
        return sortMe(a,b);
      });
      year2000 = data.Items;
    }
  });
}

function query_2004() {
  db.scan(params2004, function(err, data) {
    if (err){
        console.log(err, err.stack);
      }
    else {
      data.Items.sort(function (a,b) {
        return sortMe(a,b);
      });
      year2004 = data.Items;
    }
  });
}

function query_2008() {
  db.scan(params2008, function(err, data) {
    if (err){
        console.log(err, err.stack);
    }
    else {
      data.Items.sort(function (a,b) {
        return sortMe(a,b);
      });
      year2008 = data.Items;
    }
  });
}

function query_2015() {
  db.scan(params2015, function(err, data) {
    if (err){
        console.log(err, err.stack);
    }
    else {
      data.Items.sort(function (a,b) {
        return sortMe(a,b);
      });
      year2015 = data.Items;
    }
  });
}

function showData(res) {
  res.render('corruption.jade',
    {title: "Corruption Data",
    "results":  corruptionOverall,
    "year1995": year1995,
    "year1996": year1996,
    "year2000": year2000,
    "year2004": year2004,
    "year2008": year2008,
    "year2015": year2015
    }
  );
}


function query_sql(res, items) {
  var query2009 = "SELECT count(*) FROM doping_athletes WHERE year>2008 AND origin_country = ";
  var query2005 = "SELECT count(*) FROM doping_athletes WHERE year>2004 AND year<2009 AND origin_country = ";
  var query2001 = "SELECT count(*) FROM doping_athletes WHERE year>2000 AND year<2005 AND origin_country = ";
  var query1997 = "SELECT count(*) FROM doping_athletes WHERE year>1995 AND year<2001 AND origin_country = ";
  var query1995 = "SELECT count(*) FROM doping_athletes WHERE year>1990 AND year<1996 AND origin_country = ";
  var allQueries2009 = "";
  var allQueries2005 = "";
  var allQueries2001 = "";
  var allQueries1997 = "";
  var allQueries1995 = "";

  for (var key in corruptionOverall) {
    allQueries2009 += query2009 + corruptionOverall[key].country + "; ";
    allQueries2005 += query2005 + corruptionOverall[key].country + "; ";
    allQueries2001 += query2001 + corruptionOverall[key].country + "; ";
    allQueries1997 += query1997 + corruptionOverall[key].country + "; ";
    allQueries1995 += query1995 + corruptionOverall[key].country + "; ";
  }
  connection.query(allQueries2009 + allQueries2005 + allQueries2001 + allQueries1997 + allQueries1995, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
    }
  });
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	// query_all();
  query_1995();
  // query_1996();
  // query_2000();
  // query_2004();
  // query_2008();
  // query_2015();

};
