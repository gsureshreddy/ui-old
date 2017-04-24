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