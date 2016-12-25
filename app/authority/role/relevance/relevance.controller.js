'use strict';
angular.module('inspinia')
    .filter('role_route_checked', function () {
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
    .controller('RoleRelevanceController', RoleRelevanceController);
//ManageController.$inject = ['DTOptionsBuilder','RouterService']
function RoleRelevanceController(RouterService, RoleRelevance) {
    var vm = this;
    function get_list() {
        RouterService.list().then(function (data) {
            vm.data = data.list;
        })
    }
    get_list();
    RoleRelevance.get_role().then(function (data) {
        vm.role = data;
    });

    vm.save = function () {
        var list = [], remove = [], role = vm.role.id;
        var add_dom = [], remove_dom = [];
        angular.element('input[type="checkbox"]').each(function (i, v) {
            var has = v.dataset.has === 'true';
            var data = {
                role: role,
                route: +v.value
            }
            if (v.checked && !has) {
                add_dom.push(v);
                list.push(data);
            } else if (!v.checked && has) {
                remove_dom.push(v);
                remove.push(data);
            }
        })
        RoleRelevance.save(list, remove).then(function () { 
            angular.forEach(add_dom, function (v) { v.dataset.has = 'true' });
            angular.forEach(remove_dom, function (v) { v.dataset.has = 'false' });
        });
    }
}
