/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Request',function(err,requestData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

                if (req.session && req.session.user) { // Check if session exists
                    res.render('requests',{data:requestData, userData:req.session.user});
                }
                else {
                  res.redirect('/login');
                }
         });

         console.log(query.sql);
    });

};
