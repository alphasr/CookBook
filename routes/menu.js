/* Route, Render */
var fileDao = '../server/menuDAO.js';

function menuRouteConfig(app) {
    this.app = app;
    this.routeTable = [];
    this.init();
}

menuRouteConfig.prototype.init = function () {
    var self = this;
    this.addRoutes();
    this.processRoutes();
}

menuRouteConfig.prototype.processRoutes = function () {
    var self = this;

    self.routeTable.forEach(function (route) {
        if (route.requestType == 'get') {
            // console.log(route);
            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'post') {
            // console.log(route);
            self.app.post(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'delete') {
            // console.log(route);
            self.app.delete(route.requestUrl, route.callbackFunction);
        }
    });
}

menuRouteConfig.prototype.addRoutes = function () {
    var self = this;

    //createDomain
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/createMenu',
        callbackFunction: function (request, response) {
            if (request.session && request.session.user) {
              response.render('add_menu', {userData:request.session.user});
            }
        }
    });

    //api/createDomain
    self.routeTable.push({
        requestType : 'post',
        requestUrl : '/api/createMenu',//api
        callbackFunction : function (request, response) {
            var menuDao = require(fileDao);

            //console.log(request.body);

            menuDao.menuDao.createMenu(request.body,
                function (status) {
                    response.json(status);
                    // console.log(status);
                });
        }
    });

    //viewRecipe
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/Menu',
        callbackFunction : function (request, response) {
          if (request.session && request.session.user) {
            response.render('menu', {userData:request.session.user});
          }
        }
    });

    //viewRecipe By Id
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/Menu/:menu_id',
        callbackFunction : function (request, response) {
          if (request.session && request.session.user) {
            response.render('edit_menu', {userData:request.session.user});
          }
        }
    });

    //api/getAllRecipe
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/api/getAllMenu',//api - fine
        callbackFunction : function (request, response) {
            var menuDao = require(fileDao);

            menuDao.menuDao.getAllMenu (
                function (menuArr) {
                    // console.log(recipeArr);
                    response.json({ menuArr : menuArr });
                });
        }
    });

    //editRecipe
    self.routeTable.push({
        requestType: 'get',
        requestUrl: '/editMenu/:menu_id',
        callbackFunction: function (request, response) {
          if (request.session && request.session.user) {
            response.render('edit_menu', {userData:request.session.user});
          }
        }
    });

    //api/getRecipeById
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/api/getMenuById/:menu_id',//api
        callbackFunction : function (request, response) {
            var menuDao = require(fileDao);

            menuDao.menuDao.getMenuById(request.params.menu_id,
                function (menuArr) {
                    // console.log(domainArr);
                    response.json({ menuArr : menuArr });
            });
        }
    });

    //api/updateDomain
    self.routeTable.push({
        requestType: 'post',
        requestUrl: '/api/updateMenu',//api
        callbackFunction: function (request, response) {

            var menuDao = require(fileDao);

            menuDao.menuDao.updateMenu(request.body.menu_date, request.body.menu_state, request.body.menu_id,
                function (status) {
                    // console.log(status);
                    response.json(status);
            });
        }
    });

    self.routeTable.push({
        requestType: 'delete',
        requestUrl: '/api/deleteMenuById/:menu_id',//api
        callbackFunction: function (request, response) {
            // console.log(request.params.domain_id);

            var menuDao = require(fileDao);

            menuDao.menuDao.deleteMenuById(request.params.menu_id,
                function (status) {
                    // console.log(status);
                    response.json(status);
                });
        }
    });
}

module.exports = menuRouteConfig;
/*
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Menu',function(err,menuData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            if (req.session && req.session.user) { // Check if session exists
                res.render('menu',{data:menuData, userData:req.session.user});
            }
            else {
              res.redirect('/login');
            }

         });

         console.log(query.sql);
    });

};

exports.add = function(req, res){

  req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM Recipe',function(err,recipeData)
    {
        if(err)
            console.log("Error Selecting Recipes: %s ",err );

        res.render('add_menu', {data:recipeData, userData:req.session.user});
     });

     console.log(query.sql);
  });
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Menu WHERE MenuID = ?',[id],function(err,menuData)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_menu',{data:menuData, userData:req.session.user});


         });
         console.log(query.sql);
    });
};

exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            date    : input.date,
            state : "New"
        };

        var query = connection.query("INSERT INTO Menu set ?",data, function(err, menuData)
        {

          if (err)
            console.log("Error inserting : %s ",err );

          res.redirect('/menu');

        });

       console.log(query.sql); //get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

      var data = {
          date    : input.date,
          state : input.state
      };

        var query = connection.query("UPDATE Menu set ? WHERE MenuID = ? ",[data,id], function(err, menuData)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/menu');

        });
        console.log(query.sql); //get raw query

    });
};


exports.delete_menu = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM Menu WHERE MenuID = ? ",[id], function(err, menuData)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/menu');

        });
        console.log(query.sql); //get raw query

     });
};
*/
