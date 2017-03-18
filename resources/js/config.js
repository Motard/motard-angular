(function () {

	/**
	 * Application
	 *
	 * Use AngularUI Router to manage routing and views
	 * Each view are defined as state.
	 * Initial there are written state for all view in theme.
	 *
	 */

	function logger($logProvider, ENV) {
		$logProvider.debugEnabled(ENV.enableDebug);
	}

	logger.$inject = ['$logProvider', 'ENV'];

	function routing($stateProvider, $urlRouterProvider, ENV) {

		// Configure URL Provider
		$urlRouterProvider.otherwise(ENV.startState);

        var viewUrl = "/views/";

		$stateProvider
			.state('main', {
				url: '/',
                templateUrl: viewUrl + "start.html",
				controller: 'mainController',
                data: { pageTitle: 'motard angular' }
			});
	}


	/* Setting up routes into the angular app */
	angular
		.module('myApp')
		.config(routing)
		.config(logger);
})();