'use strict';
angular.module('inspinia')
    .service('UserService', function ($http) {

        this.list = function (data) {
            return $http({
                url: 'admin/authority/user/list',
                method: 'GET',
                data: data
            })
        };
    });