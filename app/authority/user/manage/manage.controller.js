'use strict';
angular.module('inspinia')
    .controller('UserManageController', UserManageController);
//ManageController.$inject = ['DTOptionsBuilder','RouterService']
function UserManageController(UserService, RelevanceService, $state) {
    var vm = this;
    function get_list() {
        UserService.list().then(function (data) {
            vm.data = data.list;
        })
    }
    get_list();
    vm.edit = function (data) { 
        RelevanceService.set_user(data);
        $state.go('authority.user.relevance');
    }
}
