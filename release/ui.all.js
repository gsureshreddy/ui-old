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

angular.module("ui.navigation", ["ui.core"])
    .run(function () {
        console.log('Invoking Run of Navigation Module');
    });
/**
 * UI Layout Module
 */
angular.module("ui.layout", ["ui.core", "ui.navigation"])
    .run(function () {
        console.log('Invoking Run of Layout Module');
    });
(function (ng, module, global, undefined) {

    module.directive('uiApp', function () {
       return {
           restrict     : 'AE',
           replace      : true,
           templateUrl  : function (element, attrs) {
               if (attrs.templateUrl) {
                   return attrs.templateUrl;
               } else {
                   return 'ui/layout/components/ui-app/component.html';
               }
           },
           scope : {

           },
           compile : function (element, attrs) {
               return {
                   pre: function preLink ($scope, element, attrs) {
                       console.log("Pre Link");
                   },
                   link : function link ($scope, element, attrs) {
                       console.log("Link");
                   },
                   post : function postLink ($scope, element, attrs) {
                       console.log("Post Link");
                   }
               }
           },
           controller : function ($scope) {
               console.log("Controller");
           }
       }
    });

} (angular, angular.module("ui.layout"), this));
(function (ng, module, global, undefined) {

    function LayoutService () {
        console.log('Layout service');
    }

    module.service('LayoutService', LayoutService);
}(angular, angular.module('ui.layout'), this));
angular.module('ui.layout').run(['$templateCache', function($templateCache) {$templateCache.put('ui/layout/components/ui-app/component.html','<div class="ui-app">\n    <div class="ui-app-header">\n\n    </div>\n</div>');}]);
angular.module("ui", ["ui.core", "ui.navigation", "ui.layout"]);