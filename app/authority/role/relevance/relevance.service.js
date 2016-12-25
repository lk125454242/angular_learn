angular.module('inspinia')
    .service('RoleRelevance', function ($http, toaster, $state) {
        this.role = {};
        this.set_role = function (data) {
            this.role = data;
        }
        this.get_role = function () {
            if (!this.role.id) {
                return $state.go('authority.role.manage')
            } else {
                return $http({
                    url: 'admin/authority/role/route',
                    method: 'GET',
                    params: { id: this.role.id }
                })
            }
        }
        this.save = function (list, remove) {
            return $http({
                url: 'admin/authority/role/relevance',
                method: 'POST',
                data: { routes: list, remove: remove }
            }).then(function () {
                toaster.pop({
                    type: 'success',
                    title: '保存成功',
                    body: '角色添加路由成功',
                    showCloseButton: true,
                    timeout: 2000
                });
            })
        }
    });
