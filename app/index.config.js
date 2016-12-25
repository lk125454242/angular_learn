(function () {
    /**
         * 等同于 querystring.stringfity()
         * @function param
         * @param {Object} obj
         * @return {String}
         */
    function param(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (angular.isDefined(value))
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    }
    /**
     * @function judge_path 判断路径
     * @param {String} path 需要判断的路径
     * @returns {Boolean} 是否接口数据 
     */
    function judge_path(path) {
        if (/(^api|admin)|(http:\/\/localhost:4000\/(admin|api))/.test(path)) {
            return true;
        }
        return false;
    }
    //拦截器
    function Interceptor($q, toaster) {
        return {
            /**
             * @param {Object} config
             * @param {Object} config.cache
             * @param {Object} config.headers
             * @param {String} config.method
             * @param {function} config.paramSerializer
             * @param {Array} config.transformRequest
             * @param {Array} config.transformResponse
             * @param {String} config.url
             */
            request: function (config) {
                if (judge_path(config.url)) {
                    config.url = 'http://localhost:4000/' + config.url;
                }
                return config;
            },
            /**
             * @param {Object} response
             * @param {Object} response.config
             * @param {String} response.data
             * @param {Object} response.headers
             * @param {Number} response.status
             * @param {String} response.statusText
             */
            response: function (response) {
                if (judge_path(response.config.url)) {
                    if (response.data.code !== 200) {
                        toaster.pop({
                            type: 'error',
                            title: '失败',
                            body: response.data.message,
                            showCloseButton: true,
                            timeout: 2000
                        });
                        return $q.reject();
                    } else { 
                        response = response.data.data
                    }
                }
                return response;
            },
            requestError: function (rejction) {
                toaster.pop({
                    type: 'error',
                    title: '网络错误',
                    body: '请查看网络连接是否正常',
                    showCloseButton: true,
                    timeout: 2000
                });
                return $q.reject(rejction);
            },
            /**
             * @param {Object} response
             * @param {Object} response.config
             * @param {String} response.data
             * @param {Object} response.headers
             * @param {Number} response.status
             * @param {String} response.statusText
             */
            responseError: function (rejction) {
                toaster.pop({
                    type: 'error',
                    title: '服务器异常',
                    body: '请查看网络连接是否正常，或者联系管理员',
                    showCloseButton: true,
                    timeout: 2000
                });
                return $q.reject(rejction);
            }
        }
    }
    //装饰器 装饰$log函数显示当前时间
    function Decorator($delegate) {
        angular.forEach(['log', 'debug', 'info', 'warn', 'error'], function (o) {
            $delegate[o] = decoratorLogger($delegate[o]);
        });
        function decoratorLogger(orignalFn) {
            return function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(new Date().toLocaleTimeString());
                orignalFn.apply(null, args);
            };
        }
        return $delegate
    }
    //httpProvider 配置函数
    function httpDefault($provide, $httpProvider) {
        //装饰$log函数显示当前时间
        $provide.decorator('$log', Decorator);
        //允许cookie跨域
        $httpProvider.defaults.withCredentials = true;
        //定义post请求数据格式
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        //默认转换obj为querystring
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
        //转换响应内容
        // $httpProvider.defaults.transformResponse = [function (data, headers_handler, state) {
        //     return data;
        // }];
        //添加请求拦截器
        $httpProvider.interceptors.push('Interceptor');
    }
    //HTTP 全局配置
    angular.module('inspinia')
        .factory('Interceptor', Interceptor)
        .config(httpDefault);

})()