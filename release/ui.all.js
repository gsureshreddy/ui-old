angular.module("ui.core", [])
.run(function () {
    console.log('Invoking Run of Core Module');
});
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

angular.module("ui.navigation", ["ui.core"])
    .run(function () {
        console.log('Invoking Run of Navigation Module');
    });
/**
 * UI Layout Module
 */
angular.module("ui.layout", ["ui.core", "ui.navigation"])
    .config(function (FileLoaderProvider) {
        console.log(FileLoaderProvider);
    })
    .run(function () {
        console.log('Invoking Run of Layout Module');
    });
(function (angular, layoutModule, global, undefined) {
    function LayoutService () {
        console.log('Layout service');
    }
    layoutModule.service('LayoutService', LayoutService);
})(angular, angular.module('ui.layout'), this)
angular.module("ui", ["ui.core", "ui.navigation", "ui.layout"]);