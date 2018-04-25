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
