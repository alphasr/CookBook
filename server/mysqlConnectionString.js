var mysqlConnectionString = {
	connection :{
		dev : {
			host: 'localhost',
			user: 'root',
			password : '',
			database : 'cookbook_db',
			insecureAuth: true
		},
	}
};

module.exports.mysqlConnectionString = mysqlConnectionString;
