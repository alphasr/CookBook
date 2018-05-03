// GET home page.
exports.index = function(req, res){
  res.render('index');
};

exports.login = function(req, res){
   var message = '';
   var sess = req.session;

   if(req.method == "POST"){
      var post  = req.body;
      var user = post.username;
      var pass = post.password;

      req.getConnection(function(err,connection){
          var sql = "SELECT * FROM User WHERE `login`='"+user+"' and password = '"+pass+"'";
          connection.query(sql, function(err, results){

             if(results.length){
                req.session.userId = results[0].UserID;
                req.session.user = results[0];
                console.log('Logged In as User: ' + results[0].UserID);
                res.render('dashboard', {userData:req.session.user});
                console.log('Login Success!');
             }
             else{
                message = 'Wrong Credentials.';
                res.render('index',{message: message});
                console.log('Wrong Login Credentials!');
             }

          });
        });
   } else {
      res.render('index',{message: message});
   }

};

exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/");
   })
};
