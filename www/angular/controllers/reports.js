// Date wise Controller
app.controller('reports_date_wise', ['$scope','fns','seven','$state','$filter',
    function ( $scope , fns , seven , $state, $filter ) {
        $scope.filter = {}
        $scope.filter.start_date      = '';
        $scope.filter.end_date      = '';

        seven.hideIndicator();

        $scope.populate = function(qry) {
            fns.query(qry,
                       [],function(res){
                            var dates = [];   
                            var total_sales = [];   
                            for (var i = 0;k = res.result.rows.length, i< k; i++) {
                                    dates.push(res.result.rows.item(i).date);
                                    total_sales.push(res.result.rows.item(i).total_sales);
                            }     
                        seven.hideIndicator();
                        drawChart(dates,total_sales);


                               
            });  
        }  
        $scope.populate('SELECT sale_date AS date, IFNULL(SUM(amount_total),0) AS total_sales FROM sales GROUP BY date');

        var drawChart = function(dates,total_sales) {
                $(function () {
                    $('#container').highcharts({
                        exporting: { enabled: false },
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Datewise Sales'
                        },
                        // subtitle: {
                        //     text: 'Source: WorldClimate.com'
                        // },
                        xAxis: {
                            categories: dates,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total Sales'
                            }
                        },
                        // tooltip: {
                        //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        //         '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        //     footerFormat: '</table>',
                        //     shared: true,
                        //     useHTML: true
                        // },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: 'Sales',
                            data: total_sales
                        }]
                    });
                });
        }


        $scope.filter_modal = function() {
            $('#list_block').hide();
            $('#filter_block').show();
        }


        $scope.list_view = function() {
            $('#list_block').show();
            $('#detail_block').hide();
            $('#filter_block').hide();
        }

        $scope.filter_now = function() {
                
                if($scope.filter.start_date == '' || $scope.filter.end_date == '' ){
                    seven.alert('Please enter start date and end date');
                    return;
                }
                $scope.filter.start_dater   = $filter('date')(new Date($scope.filter.start_date), "yyyy-MM-dd");
                $scope.filter.end_dater     = $filter('date')(new Date($scope.filter.end_date), "yyyy-MM-dd");

                qry = 'SELECT sale_date AS date, IFNULL(SUM(amount_total),0) AS total_sales FROM sales WHERE sale_date BETWEEN "'+$scope.filter.start_dater+'" AND "'+$scope.filter.end_dater+'" GROUP BY date';
                $scope.list_view();
                $scope.populate(qry);
        }  


        $scope.reset_now = function() {
                $scope.filter.start_date = '';
                $scope.filter.start_dater = '';
                $scope.filter.end_date = '';
                $scope.filter.end_dater = '';
                $scope.list_view();
                $scope.populate('SELECT sale_date AS date, IFNULL(SUM(amount_total),0) AS total_sales FROM sales GROUP BY date');
        }   
}]);




// Company wise Controller
app.controller('reports_company_wise', ['$scope','fns','seven','$state','$filter',
    function ( $scope , fns , seven , $state, $filter ) {
        $scope.filter = {}
        $scope.filter.start_date      = '';
        $scope.filter.end_date        = '';
        $scope.filter.company         = [];
        $scope.companies                = [];

        seven.hideIndicator();

        fns.query('SELECT company_id, company_name FROM sales GROUP BY company_id',[],function(res){
            for (var i = 0;k = res.result.rows.length, i< k; i++) {
                $scope.companies.push(res.result.rows.item(i));
            }
        });


        $scope.populate = function(qry) {
            fns.query(qry,
                       [],function(res){
                            var company = [];   
                            var total_sales = [];   
                            for (var i = 0;k = res.result.rows.length, i< k; i++) {
                                    company.push(res.result.rows.item(i).company_name);
                                    total_sales.push(res.result.rows.item(i).total_sales);
                            }     
                        seven.hideIndicator();
                        drawChart(company,total_sales);


                               
            });  
        }  
        $scope.populate('SELECT company_name, IFNULL(SUM(amount_total),0) AS total_sales FROM sales GROUP BY company_id');

        var drawChart = function(dates,total_sales) {
                $(function () {
                    $('#container').highcharts({
                        exporting: { enabled: false },
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Company wise Sales'
                        },
                        // subtitle: {
                        //     text: 'Source: WorldClimate.com'
                        // },
                        xAxis: {
                            categories: dates,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total Sales'
                            }
                        },
                        // tooltip: {
                        //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        //         '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        //     footerFormat: '</table>',
                        //     shared: true,
                        //     useHTML: true
                        // },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: 'Sales',
                            data: total_sales
                        }]
                    });
                });
        }


        $scope.filter_modal = function() {
            $('#list_block').hide();
            $('#filter_block').show();
        }


        $scope.list_view = function() {
            $('#list_block').show();
            $('#detail_block').hide();
            $('#filter_block').hide();
        }


        $scope.toggleSelection = function (company_id) {
            setTimeout(function(){
                var idx = $scope.filter.company.indexOf(company_id);
                if (idx > -1) {
                  $scope.filter.company.splice(idx, 1);
                }
                else {
                  $scope.filter.company.push(company_id);
                }
            },500);
        }



        $scope.filter_now = function() {
                if($scope.filter.company.length == 0 ){
                    seven.alert('Please select companies (or) company');
                    return;
                }
                // $scope.filter.start_dater   = $filter('date')(new Date($scope.filter.start_date), "yyyy-MM-dd");
                // $scope.filter.end_dater     = $filter('date')(new Date($scope.filter.end_date), "yyyy-MM-dd");

                qry = 'SELECT company_name, IFNULL(SUM(amount_total),0) AS total_sales FROM sales WHERE company_id IN ('+$scope.filter.company+') GROUP BY company_id';
                $scope.list_view();
                $scope.populate(qry);
        }  


        $scope.reset_now = function() {
                $scope.filter.company         = [];
                $scope.list_view();
                $scope.populate('SELECT company_name, IFNULL(SUM(amount_total),0) AS total_sales FROM sales GROUP BY company_id');
        }   
}]);


