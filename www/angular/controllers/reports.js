// Date wise Controller
app.controller('reports_date_wise', ['$scope','fns','seven','$state',
    function ( $scope , fns , seven , $state ) {
        
        seven.hideIndicator();

        fns.query('SELECT sale_date AS date, IFNULL(SUM(amount_total),0) AS total_sales FROM sales GROUP BY date',
                   [],function(res){
                        var dates = [];   
                        var total_sales = [];   
                        for (var i = 0;k = res.result.rows.length, i< k; i++) {
                                dates.push(res.result.rows.item(i).date);
                                total_sales.push(res.result.rows.item(i).total_sales);
                        }     
                    drawChart(dates,total_sales);

                           
        });    

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



}]);


