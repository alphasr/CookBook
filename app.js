/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//load routes
var recipesRoute = require('./routes/recipes');
var menuRoute = require('./routes/menu');
var dashboard = require('./routes/dashboard');
var users = require('./routes/users');
var stock = require('./routes/stock');
var requests = require('./routes/requests');
/*
//load controllers
var recipeControllers = require('require-all')({
  dirname     :  __dirname + '/controllers/recipes',
  filter      :  /(.+Controller)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});
var menuControllers = require('require-all')({
  dirname     :  __dirname + '/controllers/menu',
  filter      :  /(.+Controller)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});
*/
var app = express();

//Database Connection
var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(
  connection(mysql,{
       host:'localhost',
       user:'root',
       password:'',
       database:'cookbook_db'
  })
);

global.db = connection;

app.use(session({
              secret: 'code cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))

app.get('/', routes.index);//call for main index page
app.get('/login', routes.index);//call for login get
app.post('/login', routes.login);//call for login post
app.get('/logout', routes.logout); //call for logout post

app.get('/dashboard', dashboard.index);

app.get('/users', users.list);
app.get('/users/add', users.add);
app.post('/users/add', users.save);
app.get('/users/delete/:id', users.delete_user);
app.get('/users/edit/:id', users.edit);
app.post('/users/edit/:id',users.save_edit);

app.get('/stock', stock.list);

app.get('/requests', requests.list);

new recipesRoute(app);
new menuRoute(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
