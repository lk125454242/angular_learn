'use strict';
angular.module('inspinia')
    .controller('RouterManageController', RouterManageController)
//ManageController.$inject = ['DTOptionsBuilder','RouterService']
function RouterManageController(RouterService) {
    var vm = this;
    function get_list() {
        RouterService.list().then(function (data) {
            vm.data = data.list;
        })
    }
    get_list();
    //取消
    vm.delete_route = function (id) {
        RouterService.delete(id).then(function () {
            get_list();
        })
    }
}