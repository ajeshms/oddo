app.controller('sales_list', ['$scope','fns','seven','services',
    function ( $scope , fns , seven, services ) {
        seven.showPreloader();
        $scope.datalogin = {};
        $scope.datalogin.username = localStorage.usernameOddo;
        $scope.datalogin.password = localStorage.passwordOddo;
        $scope.data = [];
        $scope.loading = true; 
        services.master('api.php?req=sales_list',$scope.datalogin).then(function(res){
            console.log(res.data);
            $scope.data = res.data;
            $scope.loading = false;
            seven.hidePreloader();
        });
     
}]);



app.controller('sales_detail', ['$scope','fns','seven','services','$stateParams','$rootScope',
    function ( $scope , fns , seven, services, $stateParams, $rootScope ) {
        seven.showPreloader();
        $scope.datalogin = {};
        $rootScope.root_edit_id   = parseInt($stateParams.Id);
        $scope.datalogin.id       = parseInt($stateParams.Id);
        $scope.datalogin.username = localStorage.usernameOddo;
        $scope.datalogin.password = localStorage.passwordOddo;
        $scope.data = [];
        $scope.loading = true; 
        services.master('api.php?req=sales_detail',$scope.datalogin).then(function(res){
            console.log(res.data);
            $scope.data = res.data[0];
            $scope.loading = false;
            seven.hidePreloader();
        });



        $rootScope.delete   = function(){
                setTimeout(function () {
                        seven.confirm('Are you sure to delete?',function(){
                                seven.showPreloader();

                                services.master('api.php?req=sales_delete',$scope.datalogin).then(function(res){
                                        seven.hidePreloader();
                                        seven.alert('Deleted Successfully','Alert',function(){
                                                    window.location = '#/app/sales_detail'
                                        });
                                });

                        });
                },100);
        }


     
}]);



app.controller('sales_add', ['$scope','fns','seven','$state','services','$filter',
    function ( $scope , fns , seven , $state, services, $filter) {
            $scope.data = {};
           
            $scope.data.cashSales = '';
            $scope.data.creditSales = '';
            $scope.data.creditCard = ''; 
            $scope.data.saleDate = new Date();
            $scope.save = function(data){
                if($scope.data.cashSales == '' || $scope.data.creditSales == '' || $scope.data.creditCard == '' || $scope.data.saleDate == ''){
                        seven.alert('Please enter all the values!');
                        return false;
                }
                seven.showPreloader('Saving..');
                $scope.data.salesDate   = $filter('date')(new Date($scope.data.saleDate), "yyyy-MM-dd");
                // $scope.data.saleDate   = '2016-07-28 04:26:05';
                $scope.data.tokenOddo = localStorage.tokenOddo;
                $scope.data.username = localStorage.usernameOddo;
                $scope.data.password = localStorage.passwordOddo;
                services.master('api.php?req=sales_add',$scope.data).then(function(res){
                    seven.hidePreloader();

                    if(res.data != -1) {
                        console.log(res.data);
                        seven.alert('Saved Successfully');
                        window.location = '#/app/sales_list';
                    }
                });
            }
            $scope.fields = [
                 
                 {
                     title: 'Sale date',
                     model: 'saleDate', 
                     type: 'text',
                     real_type: 'date',
                     maxLength: 25,
                     icon:'icon-form-calendar' 
                 },
                 {
                     title: 'Cash sales',
                     model: 'cashSales',
                     type: 'text',
                     real_type: 'number',
                     icon: 'icon-form-name'
                 },
                 {
                     title: 'Credit sales',
                     model: 'creditSales',
                     type: 'text',
                     real_type: 'number',
                     icon: 'icon-form-gender'
                 },
                 {
                     title: 'Credit Card',
                     model: 'creditCard',
                     type: 'text',
                     real_type: 'text',
                     icon: 'icon-form-url',
                     
                 }
            ];
}]);


app.controller('sales_edit', ['$scope','fns','seven','$state','services','$filter','$stateParams','$rootScope',
    function ( $scope , fns , seven , $state, services, $filter, $stateParams, $rootScope) {
            seven.showPreloader('Loading..');
            $scope.data               = {};
            $scope.fields = [
                 
                 {
                     title: 'Sale date',
                     model: 'saleDate', 
                     type: 'text',
                     real_type: 'date',
                     maxLength: 25,
                     icon:'icon-form-calendar' 
                 },
                 {
                     title: 'Cash sales',
                     model: 'cashSales',
                     type: 'text',
                     real_type: 'number',
                     icon: 'icon-form-name'
                 },
                 {
                     title: 'Credit sales',
                     model: 'creditSales',
                     type: 'text',
                     real_type: 'number',
                     icon: 'icon-form-gender'
                 },
                 {
                     title: 'Credit Card',
                     model: 'creditCard',
                     type: 'text',
                     real_type: 'text',
                     icon: 'icon-form-url',
                     
                 }
            ];
            $scope.datalogin          = {};
            $scope.datalogin.id       = parseInt($stateParams.Id);
            $scope.datalogin.username = localStorage.usernameOddo;
            $scope.datalogin.password = localStorage.passwordOddo;
            services.master('api.php?req=sales_detail',$scope.datalogin).then(function(res){
                $scope.data.id          = res.data[0].id;
                $scope.data.cashSales   = res.data[0].cash;
                $scope.data.creditSales = res.data[0].credit;
                $scope.data.creditCard  = res.data[0].card; 
                $scope.data.saleDate  = new Date(res.data[0].sale_date); 
                $scope.loading = false;
                seven.hidePreloader();

            });

            
            $scope.save = function(data){
                if($scope.data.cashSales == '' || $scope.data.creditSales == '' || $scope.data.creditCard == '' || $scope.data.saleDate == ''){
                        seven.alert('Please enter all the values!');
                        return false;
                }
                seven.showPreloader('Saving..');
                $scope.data.salesDate   = $filter('date')(new Date($scope.data.saleDate), "yyyy-MM-dd");
                $scope.data.tokenOddo = localStorage.tokenOddo;
                $scope.data.username = localStorage.usernameOddo;
                $scope.data.password = localStorage.passwordOddo;
                services.master('api.php?req=sales_edit',$scope.data).then(function(res){
                    seven.hidePreloader();

                    if(res.data != -1) {
                        console.log(res.data);
                        seven.alert('Saved Successfully');
                        window.location = '#/app/sales_list';
                    }
                });
            }
            
}]);