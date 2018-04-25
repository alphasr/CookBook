/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//load routes
var recipes = require('./routes/recipes');
var menu = require('./routes/menu');
var dashboard = require('./routes/dashboard');
var users = require('./routes/users');
var stock = require('./routes/stock');
var requests = require('./routes/requests');

var app = express();

//Database Connection
var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
//View Engine
app.set('views', path.join(__dirname, 'views'));
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
/*
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              port : '3306',
              database : 'cookbook_db'
            });

connection.connect();
*/

app.use(
  connection(mysql,{
       host:'localhost',
       user:'root',
       password:'',
       port:3306,
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

app.get('/recipes', recipes.list);
app.get('/recipes/add', recipes.add);
app.post('/recipes/add', recipes.save);
app.get('/recipes/delete/:id', recipes.delete_recipe);
app.get('/recipes/edit/:id', recipes.edit);
app.post('/recipes/edit/:id',recipes.save_edit);

app.get('/menu', menu.list);
app.get('/menu/add', menu.add);
app.post('/menu/add', menu.save);
app.get('/menu/delete/:id', menu.delete_menu);
app.get('/menu/edit/:id', menu.edit);
app.post('/menu/edit/:id',menu.save_edit);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
