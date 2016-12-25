angular
    .module('inspinia')
    .service('authorityService', function ($http, $q, $state, toaster) {
        this.user = undefined;
        this.free = ['login', 'register', 'errorOne', 'index.main']
        /**
         * @function authority 判断路由权限
         * @param {string} path 路由地址
         * @returns {boolean} 是否有权限
         */
        this.authority = function (path) {//判断权限
            var i = 0, free = this.free, len = free.length;
            for (; i < len; i++) {
                if (free[i] === path) {
                    return true;
                }
            }
            return this._user_authority(path);
        }
        /**
         * @function authority 判断用户路由权限
         * @param {string} path 路由地址
         * @returns {boolean} 是否有权限
         */
        this._user_authority = function (path) {
            if (!this.user || !this.user.paths) {
                this.user = sessionStorage.getItem('user');
                if (!this.user || !this.user.paths) {
                    toaster.pop({
                        type: 'error',
                        title: '登录失效',
                        body: '请重新登录',
                        showCloseButton: true,
                        timeout: 2000
                    });
                    return false;
                }
            }
            var i = 0, paths = this.user.paths, len = paths.length;
            for (; i < len; i++) {
                if (paths[i] === path) {
                    return true;
                }
            }
            return false
        }
        /**
         * @function _get_user 请求用户权限 ajax
         * @param {number} 用户ID
         * @returns {promise} 回调
         */
        this._get_user = function (id) {
            return $http({
                url: 'admin/authority/user/route',
                method: 'GET',
                params: { id: id }
            })
        }
        /**
         * @function re_set_user 刷新用户权限
         * @returns {promise} 回调
         */
        this.re_set_user = function (id) {
            id = id || this.user.id;
            var that = this;
            return this._get_user(id).then(function (data) {
                that.user = data;
                sessionStorage.setItem('user', angular.toJson(data));//缓存数据
            })
        }
        /**
         * @function get_user 刷新用户权限
         * @param {number} 用户ID
         * @returns {promise} 回调
         */
        this.get_user = function (id) {
            var deferred = $q.defer();
            var user = sessionStorage.getItem('user');
            if (user) {
                deferred.resolve(angular.fromJson(user));
            } else {
                var that = this;
                that._get_user(id).then(function (data) {
                    that.user = data;
                    sessionStorage.setItem('user', angular.toJson(data));//缓存数据
                    deferred.resolve(data);
                })
            }
            return deferred.promise;
        }
        /**
         * @function clear_user 删除用户数据
         */
        this.clear_user = function () {
            this.user = undefined;
            sessionStorage.removeItem('user');//删除数据
            $http({
                url: 'api/users/logout',
                method: 'POST'
            }).then(function () {
                $state.transitionTo("login");
            })
        }
    })
