app.config(['$stateProvider','$urlRouterProvider',
  function(  $stateProvider , $urlRouterProvider ) {
          
          $urlRouterProvider.otherwise('app/home');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'partials/app.html',
                  controller:'app'
              })
              .state('app.home', {
                  url: '/home',
                  templateUrl: 'partials/modules/home.html',
                  controller: 'home'
              })
              .state('app.sales_add', {
                  url: '/sales_add',
                  templateUrl: 'partials/modules/sales/add.html',
                  controller: 'sales_add'
              })
              .state('app.sales_list', {
                  url: '/sales_list',
                  templateUrl: 'partials/modules/sales/list.html',
                  controller: 'sales_list'
              })
              .state('app.sales_detail', {
                  url: '/sales_detail/:Id',
                  templateUrl: 'partials/modules/sales/detail.html',
                  controller: 'sales_detail'
              })
              .state('app.sales_edit', {
                  url: '/sales_edit/:Id',
                  templateUrl: 'partials/modules/sales/edit.html',
                  controller: 'sales_edit'
              })

              .state('app.reports', {
                  url: '/reports',
                  templateUrl: 'partials/modules/reports/page.html',
                  // controller: 'sales_edit'
              })

              .state('app.reports_date_wise', {
                  url: '/reports_date_wise',
                  templateUrl: 'partials/modules/reports/date_wise_page.html',
                  controller: 'reports_date_wise'
              })


              .state('app.reports_company_wise', {
                  url: '/reports_company_wise',
                  templateUrl: 'partials/modules/reports/company_wise_page.html',
                  controller: 'reports_company_wise'
              })

              .state('app.reports_comparison', {
                  url: '/reports_comparison',
                  templateUrl: 'partials/modules/reports/reports_comparison.html',
                  controller: 'reports_comparison'
              })



              /*Authenticate*/
              .state('authenticate', {
                  abstract: true,
                  url: '/authenticate',
                  templateUrl: 'partials/authenticate.html',
              })
              .state('authenticate.login', {
                  url: '/login',
                  templateUrl: 'partials/modules/authenticate/login.html',
                  controller: 'login'
              })



    }
  ]
);



