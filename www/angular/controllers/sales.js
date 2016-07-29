app.controller('sales_list', ['$scope','fns','seven','services','fns','$filter',
    function ( $scope , fns , seven, services ,fns, $filter) {
        seven.showPreloader();
        $scope.datalogin        = {};
        $scope.datalogin.username = localStorage.usernameOddo;
        $scope.datalogin.password = localStorage.passwordOddo;
        $scope.data             = [];
        $scope.loading          = true; 
        $scope.companies        = [];
        $scope.filter           = {};
        $scope.filter.date      = '';
        $scope.filter.company   = '';

        fns.query('SELECT company_id, company_name FROM sales GROUP BY company_id',[],function(res){
            console.log(res.result.rows);
            for (var i = 0;k = res.result.rows.length, i< k; i++) {
                $scope.companies.push(res.result.rows.item(i));
            }
        });


        $scope.populate = function(qry) {
                fns.query(qry,[],function(res){
                    console.log(res.result.rows);
                    $scope.data = [];
                    for (var i = 0;k = res.result.rows.length, i< k; i++) {
                        $scope.data.push(res.result.rows.item(i));
                    }
                    setTimeout(function(){
                        $scope.loading = false; 
                        $scope.$apply();
                        seven.hidePreloader();
                    },333)
                });
        }

        $scope.populate('SELECT * FROM sales');

        $scope.detail_view = function(ind) {
            seven.showPreloader();
            $scope.detail = $scope.data[ind];
            $('#list_block').hide();
            $('#detail_block').show();
            seven.hidePreloader();
        }


        $scope.list_view = function() {
            $('#list_block').show();
            $('#detail_block').hide();
            $('#filter_block').hide();
        }

        $scope.filter_modal = function() {
            $('#list_block').hide();
            $('#filter_block').show();
        }

        $scope.filter_now = function() {
                $scope.loading          = true; 
                seven.showPreloader();
                if($scope.filter.date != ''){
                    $scope.filter.dater   = $filter('date')(new Date($scope.filter.date), "yyyy-MM-dd");
                    qry = 'SELECT * FROM sales WHERE sale_date="'+$scope.filter.dater+'"';
                }
                if($scope.filter.company != '') {
                    qry = 'SELECT * FROM sales WHERE company_id="'+$scope.filter.company+'"';
                }
                if($scope.filter.date != '' && $scope.filter.company != '') {
                    qry = 'SELECT * FROM sales WHERE company_id="'+$scope.filter.company+'" AND sale_date="'+$scope.filter.dater+'"';
                }
                if($scope.filter.date == '' && $scope.filter.company == ''){
                    qry = 'SELECT * FROM sales';
                }
                $scope.list_view();
                $scope.populate(qry);
        }  

        $scope.reset_now = function() {
                $scope.loading          = true; 
                seven.showPreloader();
                $scope.filter.date = '';
                $scope.filter.dater = '';
                $scope.list_view();
                $scope.populate('SELECT * FROM sales');
        }   
        
     
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
        fns.query('SELECT * FROM sales WHERE id = ?',[$scope.datalogin.id],function(res){
                var i = 0;
                $scope.data = res.result.rows.item(i);
                $scope.$apply();
                setTimeout(function(){
                    seven.hidePreloader();
                },333)
        });

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