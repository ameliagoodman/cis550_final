var AWS = require('aws-sdk');
var async = require('async');
AWS.config.loadFromPath('./config.json');

if (!AWS.config.credentials || !AWS.config.credentials.accessKeyId)
	throw 'Need to update config.json to specify your access key!';

var db = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "Corruption"
};

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
        console.log("Found indexed entries in " + params.TableName);
        res.render('corruption.jade', { title: "Corruption Data",
        "results":  data.Items}
        );
      }
    });
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res);
};
