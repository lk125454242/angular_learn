'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('inspinia')
    .directive('sideNavigation', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function () {
                    $timeout(function () {
                        element.metisMenu();
                    });
                });

            }
        };
    })
    .directive('minimalizaSidebar', function ($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope) {
                $scope.minimalize = function () {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function () {
                            angular.element('#side-menu').fadeIn(400);
                        }, 200);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    })
    .directive('iboxToolsFullScreen', function iboxToolsFullScreen($timeout) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'views/common/ibox_tools_full_screen.html',
            controller: function ($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function () {
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.find('div.ibox-content');
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    ibox.toggleClass('').toggleClass('border-bottom');
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                };
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                };
                // Function for full screen
                $scope.fullscreen = function () {
                    var ibox = $element.closest('div.ibox');
                    var button = $element.find('i.fa-expand');
                    angular.element('body').toggleClass('fullscreen-ibox-mode');
                    button.toggleClass('fa-expand').toggleClass('fa-compress');
                    ibox.toggleClass('fullscreen');
                    $timeout(function () {
                        angular.element(window).trigger('resize');
                    }, 100);
                }
            }
        };
    })
    
