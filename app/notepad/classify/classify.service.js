'use strict';
angular
    .module('inspinia')
    .service('ClassifyService', function ($http) {
        this.create = function (data) {
            return $http({
                url: 'admin/classify/create',
                method: 'POST',
                data: data
            })
        }
        this.list = function () {
            return $http({
                url: 'admin/classify/list',
                method: 'GET'
            })
        }
        this.delete = function (id) {
            return $http({
                url: 'admin/classify/delete',
                method: 'POST',
                data: {id:id}
            })
        }
        this.update = function (data) {
            return $http({
                url: 'admin/classify/update',
                method: 'POST',
                data: {
                    id: data.id,
                    level: data.level,
                    parent: data.parent,
                    name: data.name
                }
            })
        }
    })