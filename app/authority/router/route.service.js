angular.module('inspinia')
    .service('RouterService', function ($http, $state, toaster ) {
        this.register = function (data) {
            data.path = data.path.replace(/\//g, '\\');
            return $http({
                url: 'admin/authority/router/create',
                method: 'POST',
                data: data
            }).then(function () {
                toaster.pop({
                    type: 'Success',
                    title: '添加成功',
                    body: '路由添加成功',
                    showCloseButton: true,
                    timeout: 2000
                });
                $state.go('authority.router.manage')
            })
        };
        this.list = function (data) {
            return $http({
                url: 'admin/authority/router/list',
                method: 'GET',
                data: data
            })
        };
        this.delete = function (id) {
            return $http({
                url: 'admin/authority/router/delete',
                method: 'post',
                data: { id: id }
            }).then(function () { 
                toaster.pop({
                    type: 'Success',
                    title: '删除成功',
                    body: '路由删除成功',
                    showCloseButton: true,
                    timeout: 2000
                });
            })
        }
    });