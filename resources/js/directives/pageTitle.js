/**
 * pageTitle - Directive for set Page title - meta title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title
                var title = 'Welcome';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    };
}

pageTitle.$inject = ['$rootScope', '$timeout'];

/**
 *
 * Pass into module
 */
angular
    .module('myApp')
    .directive('pageTitle', pageTitle);

