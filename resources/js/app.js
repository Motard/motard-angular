/**
 *Angular Application Starting Point
 */
(function () {
	"use strict";
	var __env = {};

	// Import variables if present (from env.js)
	if(window){
		Object.assign(__env, window.__env);
	}

	var ngModule = angular.module('myApp', [
		'ui.router',        // Routing
		'ngStorage'         // Local Storage Management
	]);


	// Register environment in AngularJS as constant
	ngModule.constant('ENV', __env);
})();
