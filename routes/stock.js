/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Stock',function(err,stockData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('stock',{data:stockData});
         });

         console.log(query.sql);
    });

};
