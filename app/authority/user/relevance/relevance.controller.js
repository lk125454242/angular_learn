'use strict';
angular.module('inspinia')
    .filter('user_role_checked', function () {
        return function (value, roles) {
            if (roles && roles.length) {
                var i = 0, len = roles.length;
                for (; i < len; i++) {
                    if (value === roles[i].id) {
                        return true;
                    }
                }
            }
            return false
        }
    })
    .controller('UserRelevanceController', UserRelevanceController);
//ManageController.$inject = ['DTOptionsBuilder','RouterService']
function UserRelevanceController(RoleService, RelevanceService) {
    var vm = this;
    function get_list() {
        RoleService.list().then(function (data) {
            vm.data = data.list;
        })
    }
    get_list();
    RelevanceService.get_user().then(function (data) {
        vm.user = data;
    });
    vm.save = function () {
        var list = [], remove = [], user = vm.user.id;
        var add_dom = [], remove_dom = [];
        angular.element('input[type="checkbox"]').each(function (i, v) {
            var has = v.dataset.has === 'true';
            var data = {
                user: user,
                role: +v.value
            }
            if (v.checked && !has) {
                add_dom.push(v);
                list.push(data);
            } else if (!v.checked && has) {
                remove_dom.push(v);
                remove.push(data);
            }
        })
        RelevanceService.save(list, remove).then(function () { 
            angular.forEach(add_dom, function (v) { v.dataset.has = 'true' });
            angular.forEach(remove_dom, function (v) { v.dataset.has = 'false' });
        });
    }
}
