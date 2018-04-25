/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Recipe',function(err,recipeData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('recipes',{data:recipeData});
         });

         console.log(query.sql);
    });

};

exports.add = function(req, res){
  res.render('add_recipe');
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Recipe WHERE RecipeID = ?',[id],function(err,recipeData)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_recipe',{data:recipeData});


         });
         console.log(query.sql);
    });
};

/*Save the customer*/
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            name    : input.name,
            description : input.description
        };

        var query = connection.query("INSERT INTO Recipe set ? ",data, function(err, recipeData)
        {

          if (err)
            console.log("Error inserting : %s ",err );

          res.redirect('/recipes');

        });

       console.log(query.sql); //get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

      var data = {
          name    : input.name,
          description : input.description
      };

        var query = connection.query("UPDATE Recipe set ? WHERE RecipeID = ? ",[data,id], function(err, recipeData)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/recipes');

        });
        console.log(query.sql); //get raw query

    });
};

exports.delete_recipe = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM Recipe WHERE RecipeID = ? ",[id], function(err, recipeData)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/recipes');

        });
        console.log(query.sql); //get raw query

     });
};
