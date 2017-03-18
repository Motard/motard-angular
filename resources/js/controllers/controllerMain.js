/**
 * Created by Motard on 06/03/2017.
 */

function ctrlMain($scope, ENV, $log, mainFactory) {
    var debug = ENV.enableDebug;
    if (debug) $log.log('Calling mainController');

    $scope.init = function() {
    	console.log('this is main controller');
        $scope.getName();
	};

    /**
     * Get the name for the start view
     */
    $scope.getName = function() {
        mainFactory.getName()
            .then(function(result){
                $scope.name = result;
            });
    };

	$scope.init();
}

ctrlMain.$inject = ['$scope','ENV', '$log', 'mainFactory'];

/** Add Controller to the module **/
angular
    .module('myApp')
    .controller('mainController', ctrlMain);

