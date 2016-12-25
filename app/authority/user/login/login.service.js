angular.module('inspinia')
    .service('LoginService', function ($http, $state, authorityService) {
        this.get_data = function (data) {
            return $http({
                url: 'api/users/login',
                method: 'POST',
                data: data
            }).then(function (data) {
                authorityService.re_set_user(data.id).then(function () {
                    $state.go('index.main')
                });
            })
        }
    });