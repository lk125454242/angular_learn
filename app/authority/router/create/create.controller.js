'use strict';
angular.module('inspinia')
    .controller('RouterRegisterController', RouterRegisterController);
//RouterRegisterController.$inject = ['RouterService']
function RouterRegisterController(RouterService) {
    var vm = this;
    vm.name = '';
    vm.path = '';
    vm.type = '7';
    vm.submit = function () {
        var path = vm.path;
        path = path.replace(/(\/|\\)/g, '.');
        RouterService.register({
            name: vm.name,
            path: path,
            type: +vm.type
        })
    }
}