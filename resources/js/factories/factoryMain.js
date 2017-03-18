/**
 * Created by Motard on 06/03/2017.
 */


function factMain(ENV, $log, helperFactory) {
    var mainService = {};
    var debug = ENV.enableDebug;
    var utils = helperFactory;

    /**
     * Returns the name for the start view
     * @returns {*}
     */
    mainService.getName = function() {
        if (debug) $log.log('Calling mainService.getName() from ' + mainService.getName.caller);
        return utils.resolvedDefer(utils.getName());
    };

    return mainService;
}

factMain.$inject = ['ENV', '$log', 'helperFactory'];

/**
 * Pass into module
 */
angular
    .module('myApp')
    .factory('mainFactory', factMain);
