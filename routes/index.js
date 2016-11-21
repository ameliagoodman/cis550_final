
/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('index.jade', {
	  title: 'Please enter a country name'
  });
};
exports.do_ref = function(req, res){
  res.render('reference.jade', {});
};
