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