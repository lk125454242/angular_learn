angular
    .module('inspinia')
    .service('toasterService', function (toaster) {
        /**
         * @function success 成功toaster
         * @param message 消息内容
         */
        this.success - function (message) {
            return toaster.pop({
                type: 'success',
                title: '成功',
                body: message,
                showCloseButton: true,
                timeout: 2000
            });
        }
        /**
         * @function error 错误toaster
         * @param message 消息内容
         */
        this.error - function (message) {
            return toaster.pop({
                type: 'success',
                title: '错误',
                body: message,
                showCloseButton: true,
                timeout: 2000
            });
        }
        /**
         * @function warning 警告toaster
         * @param message 消息内容
         */
        this.warning - function (message) {
            return toaster.pop({
                type: 'success',
                title: '警告',
                body: message,
                showCloseButton: true,
                timeout: 2000
            });
        }
    })
