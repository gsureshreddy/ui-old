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
