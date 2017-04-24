/**
 * UI Layout Module
 */
angular.module("ui.layout", ["ui.core", "ui.navigation"]);
(function (angular, layoutModule, global, undefined) {
    function LayoutService () {
        console.log('Layout service');
    }
    layoutModule.service('LayoutService', LayoutService);
})(angular, angular.module('ui.layout'), this)