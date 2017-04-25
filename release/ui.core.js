angular.module("ui.core", [])
.run(function () {
    console.log('Invoking Run of Core Module');
});
(function (ng, module, global, undefined) {

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
    module.provider("FileLoader", FileLoader);

}(angular, angular.module("ui.core"), this));
