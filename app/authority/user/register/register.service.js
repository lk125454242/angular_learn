angular.module('inspinia')
    .service('RegisterService', function ($http, toaster, $state) {
        this.register = function (data) {
            var message = '';
            if (!data.igree) {
                message = '请阅读注册协议';
            }
            if (data.password != data.password_repeat) {
                message = '两次密码输入不一致';
            }
            if (message) {
                toaster.pop({
                    type: 'error',
                    title: '失败',
                    body: message,
                    showCloseButton: true,
                    timeout: 2000
                });
                return {
                    success: function () { }
                }
            }
            return $http({
                url: 'api/users/create',
                method: 'POST',
                data: data
            }).then(function () {
                toaster.pop({
                    type: 'Success',
                    title: '注册成功',
                    body: '加入LK社区成功请登录吧',
                    showCloseButton: true,
                    timeout: 2000
                });
                $state.go('login');
            })
        }
    });
