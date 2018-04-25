// GET home page.
exports.index = function(req, res){
  //res.render('dashboard');
  if (req.session && req.session.user) { // Check if session exists
      res.render('dashboard', {userData:req.session.user});
  }
  else {
    res.redirect('/login');
  }
};
