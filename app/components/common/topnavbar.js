angular.module('inspinia')
    .controller('TopNavController', function (authorityService) { 
        var vm = this;
        vm.logout = function () { 
            authorityService.clear_user();
        }
    })