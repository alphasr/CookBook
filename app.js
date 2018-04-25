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

//load routes
var recipes = require('./routes/recipes');
var menu = require('./routes/menu');
var login = require('./routes/login');
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

app.use(
    connection(mysql,{
        host: 'localhost', //'localhost',
        user: 'root',
        password : '',
        port : '3306',
        database:'cookbook_db'

    },'pool') //or single
);

app.get('/', routes.index);

app.get('/login', login.auth);

app.get('/users', users.list);

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
