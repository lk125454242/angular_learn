'use strict';
angular.module('inspinia')
    .controller('ClassifyController', function (ClassifyService) {
        var vm = this;
        var data = {
            name: '新分类',
            level: 2,
            parent: '',
            children: []
        };
        vm.drag = false;
        /* 获取列表 */
        ClassifyService.list().then(function (data) {
            vm.list = data.list;
        })
        /* 新建主分类 */
        vm.create = function () { 
            var source = angular.copy(data);
            source.level = 1;
            ClassifyService.create(source).then(function () { 
                if (vm.list) {
                    vm.list.push(source);
                } else { 
                    vm.list = [source];
                }
            })
        }
        /* 新建子分类 */
        vm.newSubItem = function (scope) {
            var parent = scope.$modelValue;
            var source = angular.copy(data);
            source.parent = parent.id;
            ClassifyService.create(source).then(function (data) {
                if (parent.children) {
                    parent.children.push(data);
                } else {
                    parent.children = [data]
                }
            })
        };
        /* 更新数据 */
        vm.update = function (name, source) {
            if (source.name === name) {
                return '不能与旧名称相同'
            }
            return ClassifyService.update({
                id: source.id,
                name: name
            })
        }

        /* tree插件配置 开始 */

        vm.treeOptions = {
            //是否可以放置
            //accept: function (sourceNodeScope, destNodesScope, destIndex) { return true; },
            //是否可以拖动 (sourceNodeScope)
            beforeDrag: function () { return vm.drag },
            //拖拽丢弃后 HOOK 
            /**
             * @function dropped
             * @param {object} event
             * - {object} event.elements 元素对象
             * - {elements[]} event.elements.dragging 源对象
             * - {elements[]} event.elements.placeholder 源对象
             * - {object} event.source 源对象
             * - {object} event.source.nodeScope 
             * - {object} event.source.nodesScope
             * - {object} event.source.index
             * - {object} event.source.cloneModel
             * - {object} event.dest
             * - {object} event.dest.nodesScope
             * - {object} event.dest.index
             * - {object} event.dest
             * - {object} event.dest 
             * - {object} event.pos postion对象
            */
            dropped: function (event) {
                var source = event.source.nodeScope.$modelValue;
                var target = event.dest.nodesScope.$parent.$modelValue
                if (target) {
                    source.level = 2;
                    source.parent = target.id;
                } else {
                    source.level = 1;
                    source.parent = 0;
                }
                ClassifyService.update(source);
                //var target_index = event.dest.index;//目标下标
            }
            //移动完成 hook
            //removed: function (node) {},
            // //拖拽开始 HOOK
            // dragStart: function (event) { },
            // //拖拽移动 HOOK
            // dragMove: function (event) { },
            // //拖拽停止 HOOK
            // dragStop: function (event) { },
            // //拖拽丢弃前 HOOK
            // beforeDrop: function (event) { },
            // //折叠 HOOK 展开状态 数据
            // toggle: function (collapsed, sourceNodeScope) { }
        }
        /* 删除功能 */
        vm.remove = function (scope) {
            ClassifyService.delete(scope.$nodeScope.$modelValue.id).then(function () {
                scope.remove();
            });
        };
        /* 收起展开 */
        vm.toggle = function (scope) {
            scope.toggle();
        };
        vm.collapseAll = function () {
            vm.$broadcast('collapseAll');
        };
        vm.expandAll = function () {
            vm.$broadcast('expandAll');
        };
    })