(function (ng, module, global, undefined) {

    function LayoutService () {
        console.log('Layout service');
    }

    module.service('LayoutService', LayoutService);
}(angular, angular.module('ui.layout'), this));