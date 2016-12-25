(function () {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider/*, $locationProvider*/) {
    $stateProvider
      //首页
      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html"
      })
      .state('index.main', {
        url: "/main",
        templateUrl: "app/main/main.html",
        data: { pageTitle: 'Example view' }
      })
      //登录
      .state('login', {
        url: "/login",
        templateUrl: "app/authority/user/login/login.html",
        data: { pageTitle: 'Example view' }
      })
      //注册
      .state('register', {
        url: "/register",
        templateUrl: "app/authority/user/register/register.html",
        data: { pageTitle: 'Example view' }
      })
      /* 权限管理 */
      .state('authority', {
        abstract: true,
        url: "/authority",
        templateUrl: "app/components/common/content.html"
      })
      //用户权限
      .state('authority.user', {
        abstract: true,
        url: "/user",
        templateUrl: "app/authority/user/user.html"
      })
      .state('authority.user.manage', {
        url: "/manage",
        templateUrl: "app/authority/user/manage/manage.html"
      })
      .state('authority.user.relevance', {
        url: "/relevance",
        templateUrl: "app/authority/user/relevance/relevance.html"
      })
      //角色权限
      .state('authority.role', {
        abstract: true,
        url: "/role",
        templateUrl: "app/authority/role/role.html"
      })
      .state('authority.role.create', {
        url: "/create",
        templateUrl: "app/authority/role/create/create.html"
      })
      .state('authority.role.manage', {
        url: "/manage",
        templateUrl: "app/authority/role/manage/manage.html"
      })
      .state('authority.role.relevance', {
        url: "/relevance",
        templateUrl: "app/authority/role/relevance/relevance.html"
      })
      //路由权限
      .state('authority.router', {
        abstract: true,
        url: "/router",
        templateUrl: "app/authority/router/route.html"
      })
      .state('authority.router.create', {
        url: "/create",
        templateUrl: "app/authority/router/create/create.html"
      })
      .state('authority.router.manage', {
        url: "/manage",
        templateUrl: "app/authority/router/manage/manage.html"
      })
      //记事本
      .state('notepad', {
        abstract: true,
        url: "/notepad",
        templateUrl: "app/components/common/content.html"
      })
      /* 分类 */
      .state('notepad.classify', {
        abstract: true,
        url: "/classify",
        templateUrl: "app/notepad/classify/classify.html"
      })
      .state('notepad.classify.manage', {
        url: "/manage",
        templateUrl: "app/notepad/classify/manage/manage.html"
      })
      /* 媒资 */
      .state('notepad.media', {
        abstract: true,
        url: "/media",
        templateUrl: "app/notepad/media/media.html"
      })
      .state('notepad.media.manage', {
        url: "/manage",
        templateUrl: "app/notepad/media/manage/manage.html"
      })
      //404
      .state('errorOne', {
        url: "/errorOne",
        templateUrl: "app/components/errorOne.html",
        data: { pageTitle: '404', specialClass: 'gray-bg' }
      })
    /*
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    */
    $urlRouterProvider.otherwise('/errorOne');
  }

})();
