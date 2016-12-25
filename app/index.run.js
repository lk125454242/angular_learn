(function () {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, authorityService ,editableOptions) {
    editableOptions.theme = 'bs3';
    //权限系统   
    $rootScope.$on('$stateChangeStart', function (event, toState/*, toParams, fromState, fromParams*/) {
      // if (!authorityService.authority(toState.name)) {
      //   event.preventDefault();
      //   $state.transitionTo("login");
      // }
    });
    $log.debug('runBlock end');
  }

})();
