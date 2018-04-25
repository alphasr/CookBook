/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Stock',function(err,stockData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

                if (req.session && req.session.user) { // Check if session exists
                    res.render('stock',{data:stockData, userData:req.session.user});
                }
                else {
                  res.redirect('/login');
                }
         });

         console.log(query.sql);
    });

};
