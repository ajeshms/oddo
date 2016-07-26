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
app.controller('app', ['$scope','seven','$state',
    function ( $scope, seven, $state ) {
            seven.hideIndicator();
            // Logout Function
            $scope.logout = function() {
                    seven.showIndicator();
                    setTimeout(function(){
                        delete localStorage.token;
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
}]);

// Home Controller
app.controller('home', ['$scope','fns','seven','$state',
    function ( $scope , fns , seven , $state ) {
            seven.hideIndicator();
}]);


