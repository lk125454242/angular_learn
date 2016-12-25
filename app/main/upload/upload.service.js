angular
    .module('inspinia')
    .service('UploadService', function ($http) {
        this.sign = function (url) {
            return $http({
                url: 'api/tencent/cos/sign',
                method: 'GET',
                params: {
                    url: url
                }
            })
        }
        //filename
    })