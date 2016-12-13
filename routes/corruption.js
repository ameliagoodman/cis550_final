var AWS = require('aws-sdk');
var async = require('async');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cgregrpimppx.us-west-2.rds.amazonaws.com',
  user     : 'welovedope',
  password : 'dope420420',
  database : 'cis550project'
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
       res.render('corruption.jade', {title: "Corruption Data", 
          "results":  items1, 
          "yearOne": items2,
          "yearTwo": items3,
          "yearThree": items4,
          "yearFour": items5,
          "yearFive": items6,
          "yearSix": data.Items
        });
    }
    
  });
      
}
function query_sql(res, items) {
  var dope = { country: "USA", 
    1994: { 
      ranking: "2",
      doping: "5"
    }
  };
  for (var key in items) {
    console.log("\n");
    for (var y in items[key].ranking) {
      console.log("COUNTRY" + items[key].country + "YEAR" + y);
      query = "SELECT origin_country FROM doping_athletes WHERE origin_country = " + items[key].country;
      connection.query(query, function(err, rows, fields) {
        if (rows) {
          console.log("COUNTRY :" + rows[0]);
        }
      })
      // query = "SELECT COUNT(*) as c FROM doping_athletes WHERE origin_country = " + items[key].country + " AND year = " + y;
      // connection.query(query, function(err, rows, fields) {
      //   if (err) console.log(err);
      //   else {
      //     var dope_score = null;
      //     if(rows[0] != null) {
      //       dope_score = rows[0].c;
      //     } else {
      //       dope_score = 0;
      //     }
      //     dope.push({country: items[key].country, y: {ranking: items[key].ranking[y], doping: dope_score}});
      //   }
      // });
    }  
  }
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res);
};
