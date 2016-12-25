
    angular.module('inspinia')
    .controller('RegisterController', function(RegisterService) {
        var vm = this;
        vm.submit = function () {
            RegisterService.register({
                username: vm.username,
                password: vm.password,
                password_repeat: vm.password_repeat,
                email: vm.email,
                igree: vm.igree
            })
        }
    });