/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM User',function(err,userList)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

                if (req.session && req.session.user) { // Check if session exists
                    res.render('users',{data:userList, userData:req.session.user});
                }
                else {
                  res.redirect('/login');
                }
         });

         console.log(query.sql);
    });

};

exports.add = function(req, res){
  res.render('add_user', {userData:req.session.user});
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM User WHERE UserID = ?',[id],function(err,userList)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_user',{data:userList, userData:req.session.user});


         });
         console.log(query.sql);
    });
};

/*Save the customer*/
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
          FirstName : input.firstname,
          LastName : input.lastname,
          Login : input.username,
          Password : input.password
        };

        var query = connection.query("INSERT INTO User set ? ",data, function(err, userList)
        {

          if (err)
            console.log("Error inserting : %s ",err );

          res.redirect('/users');

        });

       console.log(query.sql); //get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

      var data = {
        FirstName : input.firstname,
        LastName : input.lastname,
        Login : input.username,
        Password : input.password
      };

        var query = connection.query("UPDATE User set ? WHERE UserID = ? ",[data,id], function(err, userList)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/users');

        });
        console.log(query.sql); //get raw query

    });
};

exports.delete_user = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM User WHERE UserID = ? ",[id], function(err, userList)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/users');

        });
        console.log(query.sql); //get raw query

     });
};
