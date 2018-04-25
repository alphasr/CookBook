/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Request',function(err,requestData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('requests',{data:requestData});
         });

         console.log(query.sql);
    });

};
