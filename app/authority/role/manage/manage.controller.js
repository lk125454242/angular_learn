'use strict';
angular.module('inspinia')
    .controller('RoleManageController', RoleManageController);
//ManageController.$inject = ['DTOptionsBuilder','RoleService']
function RoleManageController(RoleService, RoleRelevance, $state) {
    var vm = this;
    function get_list() {
        RoleService.list().then(function (data) {
            vm.data = data.list;
        })
    }
    get_list();
    vm.delete_route = function (id) {
        RoleService.delete(id).then(function () {
            get_list();
        })
    }
    
    vm.edit = function (data) { 
        RoleRelevance.set_role(data);
        $state.go('authority.role.relevance');
    }
}
