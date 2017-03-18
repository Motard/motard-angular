/**
 * Listeners for events
 */
function onRun($rootScope,
               $state,
               ENV,
               sessionState,
               $log
) {
    /** Settings **/
    var debug = ENV.enableDebug;

    /** Determine state in RootScope **/
    $rootScope.$state = $state;

    /** Bootstrap **/
    (function () {
        $log.log('App.run()');
        setupPersistentData();
    })();

    /** Set on Persistent Data - if a refresh happened somehow **/
    function setupPersistentData() {
        if (debug) $log.info('Calling setupPersistentData()');
    }

    /**
     * Redirection mechanism that runs on Change State Success
     * @param event
     * @param toState
     * @param toParams
     */
    function onFinishStateRedirect(event, toState, toParams) {
        if (debug) $log.info('Calling onFinishStateRedirect() from ' + arguments.callee.caller.name);
    }

    /** Composite events functions **/

    function onChangeStart(event, toState, toParams, fromState, fromParams) {
        var date = new Date();
        if (debug) $log.debug(date.toLocaleString() + ' - ' +
            'Transition to ' + toState.name + ' ($stateChangeStart) - toState,' +
            'toParams : \n', toState, toParams);
        if (debug) $log.debug(date.toLocaleString() + ' - ' +
            'Requested from ' + fromState.name + ', fromState' +
            'fromParams, event : \n', fromState, fromParams, event);
        return true;
    }

    function onChangeError(event, toState, toParams, fromState, fromParams, error) {
        if (debug) $log.error('Transition Error in ' + toState.name + '.', error);
        if (debug) $log.debug(toParams);
    }

    function onChangeSuccess(event, toState, toParams, fromState, fromParams) {
         if (debug) $log.debug('$stateChangeSuccess to '+toState.name+'- ' +
         'fired once the state transition is complete.');
        return onFinishStateRedirect(event, toState, toParams);
    }

    function onViewContentLoaded(event) {
        if (debug) $log.debug('$viewContentLoaded - fired after dom rendered',event);
    }

    function onStateNotFound(event, unfoundState, fromState, fromParams) {
        if (debug) $log.debug('State not found: ' + unfoundState.name + ' ($stateNotFound)');
        if (debug) $log.debug(unfoundState, fromState, fromParams);
    }

    /** Assigning listener functions **/
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        return onChangeStart(event, toState, toParams, fromState, fromParams);
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        return onChangeError(event, toState, toParams, fromState, fromParams, error);
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        return onChangeSuccess(event, toState, toParams, fromState, fromParams);
    });
    $rootScope.$on('$viewContentLoaded', function (event, toState, toParams, fromState, fromParams) {
        return onViewContentLoaded(event, toState, toParams, fromState, fromParams);
    });
    $rootScope.$on('$stateNotFound', function (event, toState, toParams, fromState, fromParams) {
        return onStateNotFound(event, toState, toParams, fromState, fromParams);
    });

}

onRun.$inject = ['$rootScope', '$state', 'ENV', 'sessionState', '$log'];

angular
    .module('myApp')
    .run(onRun);
