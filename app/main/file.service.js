angular
    .module('inspinia')
    .service('fileService', function ($http, $q, toaster) {
        var that = this;
        this.base64_type = function (dataurl) {
            var arr = dataurl.split(',');
            return arr[0].match(/:(.*?);/)[1];
        }
        this.base64_blob = function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        }
        this.file_blob = function (blob) {
            var defer = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                defer.resolve(e.target.result)
            };
            reader.readAsDataURL(blob);
            return defer.promise
        }
        this.upload = function (file, filename) {
            var result = {
                error: undefined,
                abort: undefined,
                success: undefined,
                progress: undefined,
                then: function (key, fn) { 
                    this[key] = fn;
                    return this;
                }
            }
            $http({
                url: 'api/tencent/cos/sign',
                method: 'GET',
                params: {
                    url: encodeURI('crop/' + filename)
                }
            }).then(function (data) {
                that._ajax('//tj.file.myqcloud.com/files/v2/1252014258/font/crop/' + filename,
                    {
                        'op': 'upload',
                        'filecontent': file
                    },
                    {
                        'Authorization': data.sign
                    },
                    result
                );
                })
            return result;
        },
            this._formData = function (data) {
                var key, form = new FormData();
                for (key in data) {
                    form.append(key, data[key]);
                }
                return form;
            },
            this._ajax = function (url, data, headers, options) {
                var xhr = new XMLHttpRequest();
                xhr.upload.onprogress = function(event) {
                    options.progress && options.progress(Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0))
                };
                xhr.onload = function () {
                    if (xhr.status !== 200) {
                        toaster.pop({
                            type: 'error',
                            title: '上传失败',
                            body: xhr.response,
                            showCloseButton: true,
                            timeout: 2000
                        });
                    } else {
                        toaster.pop({
                            type: 'success',
                            title: '上传成功',
                            body: '图片上传成功',
                            showCloseButton: true,
                            timeout: 2000
                        });
                        options.progress && options.progress(100);
                        options.success && options.success( angular.fromJson(xhr.response), xhr.status)
                    }
                };
                xhr.onerror = function () {
                    toaster.pop({
                        type: 'error',
                        title: '上传失败',
                        body: xhr.response,
                        showCloseButton: true,
                        timeout: 2000
                    });
                    options.error && options.error( angular.fromJson(xhr.response), xhr.status)
                };
                xhr.onabort = function () {
                    toaster.pop({
                        type: 'error',
                        title: '上传失败',
                        body: xhr.response,
                        showCloseButton: true,
                        timeout: 2000
                    });
                    options.abort && options.abort( angular.fromJson(xhr.response), xhr.status, xhr.getAllResponseHeaders());
                };
                xhr.open('POST', url, true);
                //xhr.withCredentials = item.withCredentials;
                for (var headers_key in headers) {
                    xhr.setRequestHeader(headers_key, headers[headers_key]);
                }
                xhr.send(this._formData(data));
            }
    })