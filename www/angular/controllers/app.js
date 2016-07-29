// Login controller
app.controller('login', ['$scope','fns','seven','$state','services',
    function ( $scope , fns , seven , $state, services ) {
        if(localStorage.token) $state.go('app.home');

        $scope.data = {};
        $scope.signIn = function(){
            seven.showIndicator();
            services.master('api.php?req=login',$scope.data).then(function(res){
                if ((res.data.user_id)&&(res.data.user_id != -1)) {
                    localStorage.tokenOddo    = res.data.user_id;
                    localStorage.usernameOddo = $scope.data.username;
                    localStorage.passwordOddo = $scope.data.password;
                    localStorage.userDetails  = JSON.stringify(res.data);
                    setTimeout(function(){
                        $state.go('app.home');
                    },2000)
                } else {
                    seven.hideIndicator();
                    seven.alert('Wrong Username/Password');
                }
            });
        }
}]);

// App Controller
app.controller('app', ['$scope','seven','$state','services','fns','$rootScope',
    function ( $scope, seven, $state, services, fns, $rootScope ) {
            seven.hideIndicator();
            // Logout Function
            $scope.logout = function() {
                    seven.showIndicator();
                    setTimeout(function(){
                        delete localStorage.tokenOddo;
                        seven.hideIndicator();
                        window.location.href = '#/authenticate/login';
                    },1000)
            }
            $scope.profile = JSON.parse(localStorage.userDetails);
            console.log($scope.profile);
            // Go back function
            $scope.goBack = function() {
                window.history.go(-1);
            }

            $scope.getDbDatas = function() {
                    console.log('Getting the db datas');
                    seven.showPreloader('Fetching datas from db');
                    $scope.datalogin = {};
                    $scope.datalogin.username = localStorage.usernameOddo;
                    $scope.datalogin.password = localStorage.passwordOddo;
                    $scope.data = [];
                    $scope.loading = true; 
                    $scope.datum = function() {
                            fns.query('SELECT * FROM sales',[],function(res){
                                console.log(res.result.rows);
                                $scope.data = [];
                                for (var i = 0;k = res.result.rows.length, i< k; i++) {
                                    $scope.data.push(res.result.rows.item(i));
                                }
                                setTimeout(function(){
                                    window.location.reload();
                                },200)
                            });
                    }
                    services.master('api.php?req=sales_list',$scope.datalogin).then(function(res){
                        fns.query('DELETE FROM sales',[],function() {
                            for (var i = 0 ; i < res.data.length; i++) {
                                console.log(res.data[i]);
                                fns.query('INSERT into sales (id,sale_date,credit,cash,card,company_id,company_name,amount_total,payables,amount_avg,close_value) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [res.data[i].id,res.data[i].sale_date,res.data[i].credit,res.data[i].cash,res.data[i].card,res.data[i].company_id[0],res.data[i].company_id[1],res.data[i].amount_total,res.data[i].payables,res.data[i].amount_avg,res.data[i].close_value],function(res){
                                    
                                });
                            };
                           $scope.datum();

                        });
                        
                    });
            }

}]);

// Home Controller
app.controller('home', ['$scope','fns','seven','$state',
    function ( $scope , fns , seven , $state ) {
            seven.hideIndicator();
}]);


