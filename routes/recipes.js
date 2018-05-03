/* Route, Render */
//productCategoryRouteConfiguration.js
var fileDao = '../server/recipesDAO.js';

function recipeRouteConfig(app) {
    this.app = app;
    this.routeTable = [];
    this.init();
}

recipeRouteConfig.prototype.init = function () {
    var self = this;
    this.addRoutes();
    this.processRoutes();
}

recipeRouteConfig.prototype.processRoutes = function () {
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

recipeRouteConfig.prototype.addRoutes = function () {
    var self = this;

    //createDomain
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/createRecipe',
        callbackFunction: function (request, response) {
            if (request.session && request.session.user) {
              response.render('add_recipe', {userData:request.session.user});
            }
            else {
              redirect('/login');
            }
        }
    });

    //api/createDomain
    self.routeTable.push({
        requestType : 'post',
        requestUrl : '/api/createRecipe',//api
        callbackFunction : function (request, response) {
            var recipeDao = require(fileDao);

            //console.log(request.body);

            recipeDao.recipeDao.createRecipe(request.body,
                function (status) {
                    //response.json(status);
                    if (request.session && request.session.user) {
                      response.render('recipes', {userData:request.session.user});
                    }
                    else {
                      redirect('/login');
                    }

                    console.log(status);
                });
        }
    });

    //viewRecipe
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/Recipes',
        callbackFunction : function (request, response) {
          if (request.session && request.session.user) {
            response.render('recipes', {userData:request.session.user});
          }
          else {
            redirect('/login');
          }
        }
    });

    //viewRecipe By Id
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/Recipes/:recipe_id',
        callbackFunction : function (request, response) {
          if (request.session && request.session.user) {
            response.render('edit_recipe', {userData:request.session.user});
          }
          else {
            redirect('/login');
          }
        }
    });

    //api/getAllRecipe
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/api/getAllRecipe',//api - fine
        callbackFunction : function (request, response) {
            var recipeDao = require(fileDao);

            recipeDao.recipeDao.getAllRecipe (
                function (recipeArr) {
                    // console.log(recipeArr);
                    response.json({ recipeArr : recipeArr });
                });
        }
    });

    //editRecipe
    self.routeTable.push({
        requestType: 'get',
        requestUrl: '/editRecipe/:recipe_id',
        callbackFunction: function (request, response) {
          if (request.session && request.session.user) {
            response.render('edit_recipe', {userData:request.session.user});
          }
          else {
            redirect('/login');
          }
        }
    });

    //api/getRecipeById
    self.routeTable.push({
        requestType : 'get',
        requestUrl : '/api/getRecipeById/:recipe_id',//api
        callbackFunction : function (request, response) {
            var recipeDao = require(fileDao);

            recipeDao.recipeDao.getRecipeById(request.params.recipe_id,
                function (recipeArr) {
                    // console.log(domainArr);
                    response.json({ recipeArr : recipeArr });
            });
        }
    });

    //api/updateDomain
    self.routeTable.push({
        requestType: 'post',
        requestUrl: '/api/updateRecipe',//api
        callbackFunction: function (request, response) {

            var recipeDao = require(fileDao);
            recipeDao.recipeDao.updateRecipe(request.body.recipe_name, request.body.recipe_description, request.body.recipe_id,
                function (status) {
                    console.log(status);

                    if (request.session && request.session.user) {
                      response.render('recipes', {userData:request.session.user});
                    }
                    else {
                      redirect('/login');
                    }
                    //response.json(status);
            });
        }
    });

    self.routeTable.push({
        requestType: 'delete',
        requestUrl: '/api/deleteRecipeById/:recipe_id',//api
        callbackFunction: function (request, response) {
            // console.log(request.params.domain_id);

            var recipeDao = require(fileDao);
            recipeDao.recipeDao.deleteRecipeById(request.params.recipe_id,
                function (status) {
                    console.log(status);

                    if (request.session && request.session.user) {
                      response.render('recipes', {userData:request.session.user});
                    }
                    else {
                      redirect('/login');
                    }
                    //response.json(status);
                });
        }
    });
}

module.exports = recipeRouteConfig;
/*
exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Recipe',function(err,recipeData)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

                if (req.session && req.session.user) { // Check if session exists
                    res.render('recipes',{data:recipeData, userData:req.session.user});
                }
                else {
                  res.redirect('/login');
                }
         });

         console.log(query.sql);
    });

};

exports.add = function(req, res){
  res.render('add_recipe', {userData:req.session.user});
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM Recipe WHERE RecipeID = ?',[id],function(err,recipeData)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_recipe',{data:recipeData, userData:req.session.user});


         });
         console.log(query.sql);
    });
};

//Save the customer
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            name    : input.name,
            description : input.description
        };

        var query = connection.query("INSERT INTO Recipe set ? ",data, function(err, recipeData)
        {

          if (err)
            console.log("Error inserting : %s ",err );

          res.redirect('/recipes');

        });

       console.log(query.sql); //get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

      var data = {
          name    : input.name,
          description : input.description
      };

        var query = connection.query("UPDATE Recipe set ? WHERE RecipeID = ? ",[data,id], function(err, recipeData)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/recipes');

        });
        console.log(query.sql); //get raw query

    });
};

exports.delete_recipe = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM Recipe WHERE RecipeID = ? ",[id], function(err, recipeData)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/recipes');

        });
        console.log(query.sql); //get raw query

     });
};
*/
