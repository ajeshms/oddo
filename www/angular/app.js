/* Core Phone gap [JS] Codes */ 
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// onDeviceReady
function onDeviceReady() {
        // Back Button Management
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
            var exit_confirm = confirm('Are you sure to exit app? ');
            if(exit_confirm) navigator.app.exitApp();
        }, false );
}

/* Creating the config */
angular.module('configs', []).constant('C', {
    'name'  : 'ODDO App'
});

/* Creating Module app */
var app = angular.module('app', [
	'configs',
    'ui.router',
]);

/*config Phase*/
app.config(['$controllerProvider','$compileProvider','$filterProvider','$provide',
   function( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;
        }
]);


/*Run Phase*/
app.run(['$rootScope','$state','$stateParams','seven',
function( $rootScope , $state , $stateParams , seven ) {
        console.log('Run'); 
           

        // Checking whether the User is authenticated and has a token
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
              if((toState.name.split('.')[0] != 'authenticate') && (!localStorage.tokenOddo) ){
                     delete localStorage.token;
                     window.location.href = '#/authenticate/login';
              }
        });

        // On Each state change success scroll to the top of the page
        $rootScope.$on('$stateChangeSuccess', function() {
              document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

}])


