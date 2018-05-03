var connectionProvider = require('./mysqlConnectionStringProvider.js');//path

var table_name = 'Recipe';

var recipeDao = {

	createRecipe : function (recipe, OnSuccessfulCallback) {//
		var insertStatement = "INSERT INTO " + table_name + " SET ?";

		var recipeArr = {
			//ColumnName: recipe...
			name: recipe.name,
			description: recipe.description
		};

		console.log(recipeArr);

		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();//from mysqlConnectionStringProvider.js

		if (connection) {
			connection.query(insertStatement, recipeArr, function (err, result) {
				if (err) { }

				OnSuccessfulCallback({status: 'successful'});

				// console.log(result)
			});
			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	},

	getAllRecipe: function (callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "SELECT * FROM " + table_name + " ORDER BY RecipeID";

		if (connection) {
			connection.query(queryStatement, function (err, rows, fields) {
				if (err) { throw err; }

				// console.log(rows);

				callback(rows);
			});
			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	}
	,

	getRecipeById : function (recipe_id, callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "SELECT * FROM " + table_name + " WHERE RecipeID = ?";

		if(connection) {
			connection.query(queryStatement, [recipe_id], function (err, rows, fields) {
				if (err) { throw err; }

				console.log(rows);//working

				callback(rows);
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	},

	updateRecipe: function(recipe_name, recipe_description, recipe_id, callback) {

		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "UPDATE " + table_name + " SET Name = ? , Description = ?, WHERE RecipeID = ?";

		if(connection) {
			connection.query(queryStatement, [recipe_name, recipe_description, recipe_id], function (err, rows, fields) {
				if (err) { throw err; }

				console.log(rows);

				if (rows) {
					callback({ status: 'successful' })
				}
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}

	},

	deleteRecipeById: function(recipe_id, callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "DELETE FROM " + table_name + " WHERE RecipeID = ?";

		if(connection) {
			connection.query(queryStatement, [recipe_id], function (err, rows, fields) {
				if (err) { throw err; }

				console.log(rows);

				if (rows) {
					callback({ status: 'successful' })
				}
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	}
};

module.exports.recipeDao = recipeDao;
