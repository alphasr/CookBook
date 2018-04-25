exports.login = function(req, res){
   var message = '';
   var sess = req.session;

   if(req.method == "POST"){
      var post  = req.body;
      var user = post.username;
      var pass = post.password;

      var sql = "SELECT * FROM User WHERE `login`='"+user+"' and password = '"+pass+"'";
      db.query(sql, function(err, results){
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.render('dashboard', {userData:results});
            console.log('Login Success!');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index',{message: message});
            console.log('Wrong Login Credentials!');
         }

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
/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM User',function(err,userData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('users',{data:userData});
         });

         console.log(query.sql);
    });

};
