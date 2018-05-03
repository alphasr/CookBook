var connectionProvider = require('./mysqlConnectionStringProvider.js');//path

var table_name = 'Menu';

var menuDao = {

	createMenu : function (menu, OnSuccessfulCallback) {//
		var insertStatement = "INSERT INTO " + table_name + " SET ?";

		var menuArr = {
			//ColumnName: recipe...
			date: menu.date,
			state: new
		};

		console.log(menuArr);

		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();//from mysqlConnectionStringProvider.js

		if (connection) {
			connection.query(insertStatement, menuArr, function (err, result) {
				if (err) { }

				OnSuccessfulCallback({status: 'successful'});

				// console.log(result)
			});
			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	},

	getAllMenu: function (callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "SELECT * FROM " + table_name + " ORDER BY MenuID";

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

	getMenuById : function (menu_id, callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "SELECT * FROM " + table_name + " WHERE MenuID = ?";

		if(connection) {
			connection.query(queryStatement, [menu_id], function (err, rows, fields) {
				if (err) { throw err; }

				console.log(rows);//working

				callback(rows);
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	},

	updateMenu: function(menu_date, menu_state, menu_id, callback) {

		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "UPDATE " + table_name + " SET Date = ? , State = ?, WHERE MenuID = ?";

		if(connection) {
			connection.query(queryStatement, [menu_date, menu_state, menu_id], function (err, rows, fields) {
				if (err) { throw err; }

				console.log(rows);

				if (rows) {
					callback({ status: 'successful' })
				}
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}

	},

	deleteMenuById: function(menu_id, callback) {
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "DELETE FROM " + table_name + " WHERE MenuID = ?";

		if(connection) {
			connection.query(queryStatement, [menu_id], function (err, rows, fields) {
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

module.exports.menuDao = menuDao;
