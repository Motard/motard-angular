/**
 * Created by Motard on 06/03/2017.
 */


function helperFactory($q) {



    function resolvedDefer(result) {
        var defer = $q.defer();
        defer.resolve(result);
        return defer.promise;
    }
    function rejectedDefer(reason) {
        var defer = $q.defer();
        defer.reject(reason);
        return defer.promise;
    }

    /**
     * Generate the name
     * @returns {string}
     */
    function getName() {
        return 'motard';
    }

    var result = {
        resolvedDefer: resolvedDefer,
        rejectedDefer: rejectedDefer,
        getName: getName
    };

    return result;
}

helperFactory.$inject = ['$q'];

angular
    .module('myApp')
    .factory('helperFactory', helperFactory);

