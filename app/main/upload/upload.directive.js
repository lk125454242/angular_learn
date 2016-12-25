angular
    .module('inspinia')
    .directive('customUpload', function (FileUploader, UploadService) {
        return {
            restrict: 'A',
            templateUrl: 'app/main/upload/upload.html',
            replace: true,
            priority: 10,//优先级
            //terminal: true, //优先级低于此指令不执行
            scope: {
                drop: '=drop',
                mime: '=mime',
                limit: '=limit'

            },//独立作用域 fasle 继承 true 继承并创建 child !=> parent
            //transclude: true, //ng-transclude  内嵌内容
            controller: function ($scope/*, $element, $attrs, $transclude*/) {
                function init_uploader() {
                    var base = '//tj.file.myqcloud.com/files/v2/1252014258/font/cms/'
                    var options = {
                        queueLimit: $scope.limit,
                        //withCredentials: true,
                        headers: {},
                        alias: 'filecontent',
                        formData: [{
                            'op': 'upload'
                        }]
                    }
                    UploadService.sign(undefined).then(function (result) {
                        options.headers.Authorization = result.sign;//签名
                    });
                    var uploader = $scope.uploader = new FileUploader(options);
                    // FILTERS
                    uploader.filters.push({
                        name: 'MIMEFilter',
                        fn: function (item/*, options*/) {
                            var type = item.type
                            return type.indexOf($scope.mime) != -1;
                        }
                    });
                    /* 上传回调 */
                    // uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                    //     console.info('onWhenAddingFileFailed', item, filter, options);
                    // };
                    // uploader.onAfterAddingFile = function (fileItem) {
                    //     console.info('onAfterAddingFile', fileItem);
                    // };
                    // uploader.onAfterAddingAll = function (addedFileItems) {
                    //     console.info('onAfterAddingAll', addedFileItems);
                    // };
                    uploader.onBeforeUploadItem = function (item) {
                        item.url = base + item.file.name;
                    };
                    // uploader.onProgressItem = function (fileItem, progress) {
                    //     console.info('onProgressItem', fileItem, progress);
                    // };
                    // uploader.onProgressAll = function (progress) {
                    //     console.info('onProgressAll', progress);
                    // };
                    // uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    //     console.info('onSuccessItem', fileItem, response, status, headers);
                    // };
                    // uploader.onErrorItem = function (fileItem, response, status, headers) {
                    //     console.info('onErrorItem', fileItem, response, status, headers);
                    // };
                    // uploader.onCancelItem = function (fileItem, response, status, headers) {
                    //     console.info('onCancelItem', fileItem, response, status, headers);
                    // };
                    // uploader.onCompleteItem = function (fileItem, response, status, headers) {
                    //     console.info('onCompleteItem', fileItem, response, status, headers);
                    // };
                    // uploader.onCompleteAll = function () {
                    //     console.info('onCompleteAll');
                    // };
                }
                init_uploader();
            }
            //require: 'controllerInstance',//自身,'?'null 给link第四个参数,'^'父级查找,'?^'组合
            //link: function ($scope, $element, $attrs, controllerInstance) { },
            //compile: function ($element, $attrs, $transclude) { ... },
        };
    });
    //使用方法 <div custom-upload limit="3" mime="'image'"></div>