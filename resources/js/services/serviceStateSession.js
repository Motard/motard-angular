/**
 * Created by Motard on 06/03/2017.
 */

function servStateSession($localStorage, ENV) {
    var debug = ENV.enableDebug;
    var permService = {};

    permService.state = {
        key: null
    };

    /** Saving data **/
    permService.saveStateData = function() {
        $localStorage.state = this.state;
        return this.state;
    };
    /** Getting data **/
    permService.loadStateData = function() {
        if ($localStorage.state) this.state = $localStorage.state;
        return this.state;
    };

    /** Destroy Persistent Data **/
    permService.destroy = function() {
        if ($localStorage.state) delete $localStorage.state;
        this.state = {
            key: null
        };
        return this.state;
    };

    /** Update State Data **/
    permService.updateState = function(key) {
        this.state = {
            key: key
        };
        this.saveStateData();
    };

    /** Verify that information exists **/
    permService.exists = function() {
        return (this.state.key !== null || this.loadStateData().key !== null);
    };

    /** Verify that data exists **/
    permService.dataExists = function() {
        if (this.state.key !== null) return true;
        else {
            var state = this.loadStateData();
            if (this.state.key !== null) return true;
        }
        return false;
    };

    return permService;
}

servStateSession.$inject = ['$localStorage','ENV'];

/** Pass into module **/
angular
    .module('myApp')
    .service('sessionState', servStateSession);
