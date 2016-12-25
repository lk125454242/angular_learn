angular.module('inspinia')
    .service('RoleService', function ($http, $state, toaster ) {
        this.register = function (data) {
            return $http({
                url: 'admin/authority/role/create',
                method: 'POST',
                data: data
            }).then(function () {
                toaster.pop({
                    type: 'Success',
                    title: '添加成功',
                    body: '角色添加成功',
                    showCloseButton: true,
                    timeout: 2000
                });
                $state.go('authority.role.manage')
            })
        };
        this.list = function (data) {
            return $http({
                url: 'admin/authority/role/list',
                method: 'GET',
                data: data
            })
        };
        this.delete = function (id) {
            return $http({
                url: 'admin/authority/role/delete',
                method: 'post',
                data: { id: id }
            }).then(function () { 
                toaster.pop({
                    type: 'Success',
                    title: '删除成功',
                    body: '角色删除成功',
                    showCloseButton: true,
                    timeout: 2000
                });
            })
        }
    });