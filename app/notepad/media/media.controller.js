'use strict';
angular.module('inspinia')
    .controller('MediaController', function ($scope, $log, toaster, fileService, MediaService) {
        var vm = this;

        MediaService.list().then(function (data) {
            var base = data.base;
            angular.forEach(data.list, function (v) { 
                if (v.picture) {
                    v.picture = base + v.picture
                } else { 
                    v.picture = 'http://web-mobile-top.bj.bcebos.com/default/picture.jpg';
                }
            })
            vm.list = data.list
        })

        var source = { name: '', picture: '', describe: '' }
        vm.new = angular.copy(source);

        vm.show_from = false;
        vm.save = function () { 
            MediaService.create(vm.new).then(function () { 
                vm.show_from = false;
            });
        }

        /* 上传逻辑 开始*/
        vm.upload = function () {
            var data = vm.myCroppedImage;
            fileService.upload(fileService.base64_blob(data), +new Date())
                .then('success', function (data) {
                    var url = data.data.source_url.slice(42);
                    vm.new.picture = url;
                })
                .then('progress', function (progress) {
                    angular.element('#progress').css('width', progress + '%')
                });
        }
        /* 上传逻辑 结束*/
        /* 切割图片逻辑 开始 */
        vm.myCroppedImage = '';//图片base64输出变量
        vm.myImage = ""
        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            if (file) {
                var type = file.type;
                if (/image/.test(type)) {
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.Media.myImage = evt.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                } else {
                    toaster.pop({
                        type: 'error',
                        title: '失败',
                        body: '请选择图片文件',
                        showCloseButton: true,
                        timeout: 2000
                    });
                }
            } else {
                vm.myCroppedImage = '';
                vm.myImage = ""
            }
        };
        angular.element('#fileInput').on('change', handleFileSelect);
        /* 切割图片逻辑 结束 */
    })