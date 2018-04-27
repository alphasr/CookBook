exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Menu',function(err,menuData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            if (req.session && req.session.user) { // Check if session exists
                res.render('menu',{data:menuData, userData:req.session.user});
            }
            else {
              res.redirect('/login');
            }

         });

         console.log(query.sql);
    });

};

exports.add = function(req, res){

  req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM Recipe',function(err,recipeData)
    {
        if(err)
            console.log("Error Selecting Recipes: %s ",err );

        res.render('add_menu', {data:recipeData, userData:req.session.user});
     });

     console.log(query.sql);
  });
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Menu WHERE MenuID = ?',[id],function(err,menuData)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_menu',{data:menuData, userData:req.session.user});


         });
         console.log(query.sql);
    });
};

exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            date    : input.date,
            state : "New"
        };

        var query = connection.query("INSERT INTO Menu set ?",data, function(err, menuData)
        {

          if (err)
            console.log("Error inserting : %s ",err );

          res.redirect('/menu');

        });

       console.log(query.sql); //get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

      var data = {
          date    : input.date,
          state : input.state
      };

        var query = connection.query("UPDATE Menu set ? WHERE MenuID = ? ",[data,id], function(err, menuData)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/menu');

        });
        console.log(query.sql); //get raw query

    });
};


exports.delete_menu = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM Menu WHERE MenuID = ? ",[id], function(err, menuData)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/menu');

        });
        console.log(query.sql); //get raw query

     });
};
