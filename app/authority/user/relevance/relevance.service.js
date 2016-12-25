angular.module('inspinia')
    .service('RelevanceService', function ($http, toaster, $state) {
        this.user = {};
        this.set_user = function (data) {
            this.user = data;
        }
        this.get_user = function () {
            if (!this.user.id) {
                return $state.go('authority.user.manage')
            } else {
                return $http({
                    url: 'admin/authority/user/role',
                    method: 'GET',
                    params: { id: this.user.id }
                })
            }
        }
        this.save = function (list, remove) {
            return $http({
                url: 'admin/authority/user/relevance',
                method: 'POST',
                data: { roles: list, remove: remove }
            }).then(function () {
                toaster.pop({
                    type: 'success',
                    title: '保存成功',
                    body: '用户添加角色成功',
                    showCloseButton: true,
                    timeout: 2000
                });
            })
        }
    });
