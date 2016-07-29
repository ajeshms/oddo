app.service("fns", ['$http','C', function( $http , C ) {
    this.db = {};
    console.log(C);
    // Creating the database
    this.createDatabase = function() { 
		    	try {
				    if (!window.openDatabase) {
				        alert('Database not supported');
				    } else {
					 	this.db = openDatabase(C.db.Name, C.db.Version, C.db.DisplayName, C.db.MaxSize);
				    }
				    return true
				} catch(e) {
				    if (e == 2) {
				        alert("Invalid database version.");
				    } else {
				        alert("Unknown error "+e+".");
				    }
				    return false;
				}
	}

    // Creating the table
	this.createTables   = function() {
			this.db.transaction(function(tx){
				   			tx.executeSql( 'DROP TABLE sales');
				   			// tx.executeSql( 'DROP TABLE Test');
				   			console.log('Drop');
			});
			var sales_table_query 	= 'CREATE TABLE IF NOT EXISTS sales (sales_id INTEGER PRIMARY KEY AUTOINCREMENT,id int, sale_date DATE, credit DATE, cash int, card TEXT,company_id int,company_name TEXT,amount_total int,payables int,amount_avg int,close_value int)';
			this.query(sales_table_query,[],function(res){
				console.log(res);
			});

	}
	//Querying the db
	this.query  = function(query,parameters,callback) {
			this.db.transaction(function(tx){
	   			tx.executeSql(  query, parameters,
								function(tx,result){
									callback({ 'code'  : 1, 'tx'    : tx, 'result': result });
								},
								function(error){
									callback({ 'code'  : 2, 'error' : error });
								});
			},
			function(error){
				alert("Error processing SQL:"+error.code);
				alert("Error processing SQL:"+error.message);
			},
			function(success){
			 		// console.log('success');
			});
	}
}]);