'use strict';

angular.module('inspinia')
    .controller('MainController', function (DTOptionsBuilder, DataTableService) {
        /* datatable 配置 */
        var vm = this;
        vm.dtOptions = DataTableService.dtOptions;
    })