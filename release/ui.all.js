angular.module("ui.core", []);
(function (angular, coreModule, global, undefined) {

    /**
     * FileLoader
     * @constructor
     */
    function FileLoader () {

        var provider = this;

        /**
         * Loads Javascript File
         * @param url
         */
        provider.loadJavaScript  = function (url) {
            console.log("Requested to load script from " + url);
        }

        /**
         * Loads Css File
         * @param url
         */
        provider.loadCss = function (url) {
            if (url === undefined) {
                console.error("URL Cannot be null");
                return;
            }
            console.log("Requested to load css from " + url);
        }

        this.$get = function () {
            return provider;
        }
    }

    //Registering provider
    coreModule.provider("FileLoader", FileLoader);

})(angular, angular.module("ui.core"), this);

angular.module("ui.navigation", ["ui.core"]);
angular.module("ui.layout", ["ui.core", "ui.navigation"]);
(function (angular, layoutModule, global, undefined) {
    function LayoutService () {
        console.log('Layout service');
    }
    layoutModule.service('LayoutService', LayoutService);
})(angular, angular.module('ui.layout'), this)