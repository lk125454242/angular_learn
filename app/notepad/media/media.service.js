'use strict';
angular
    .module('inspinia')
    .service('MediaService', function ($http) {
        this.create = function (data) {
            return $http({
                url: 'admin/media/create',
                method: 'POST',
                data: data
            })
        }
        this.list = function () {
            return $http({
                url: 'admin/media/list',
                method: 'GET'
            })
        }
        this.delete = function (id) {
            return $http({
                url: 'admin/media/delete',
                method: 'POST',
                data: {id:id}
            })
        }
        this.update = function (data) {
            return $http({
                url: 'admin/media/update',
                method: 'POST',
                data: data
            })
        }
    })