'use strict';
angular.module('inspinia')
    .controller('RoleRegisterController', RoleRegisterController);
//RouterRegisterController.$inject = ['RouterService']
function RoleRegisterController(RoleService) {
    var vm = this;
    vm.name = '';
    vm.type = '7';
    vm.submit = function () {
        RoleService.register({
            name: vm.name,
            type: +vm.type
        })
    }
}