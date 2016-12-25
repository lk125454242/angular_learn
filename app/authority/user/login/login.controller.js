'use strict';

angular.module('inspinia')
    .controller('LoginController', function(LoginService) {
        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.submit = function() {
            LoginService.get_data({
                username: vm.username,
                password: vm.password
            })
        }
    });