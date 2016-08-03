var smartCommunityApp = angular.module('smartCommunityApp',['ngRoute','ngDialog']);
smartCommunityApp.config(['$routeProvider',function ($routeProvider) {
      $routeProvider
      .when('/homepage', {
		  templateUrl: 'views/homepage.html',
      })
      .when('/life', {
          templateUrl: 'views/life.html',
      })
	  .when('/property', {
          templateUrl: 'views/property.html',
      })
	  .when('/forum', {
          templateUrl: 'views/forum.html',
      })
	  .when('/around', {
          templateUrl: 'views/around.html',
      })
	  .when('/user_login', {
          templateUrl: 'views/user_login.html',
      })
	  .when('/user_register', {
          templateUrl: 'views/user_register.html',
      })
	  .when('/list/:id', {
          templateUrl: 'views/route/detail.html',
          controller: 'RouteDetailCtl'
      })
      .otherwise({
        redirectTo: '/homepage'
      });
}]);


smartCommunityApp.controller('dialogController', function($scope, ngDialog){
 $scope.template = '<div><p>text in dialog</p><p><button type="button">Button</button></p><div>';
	$scope.openUseExternalTemplate = function(){
      ngDialog.open({
        template: 'serverTpl.html',
        plain: false,
        className: 'ngDialog-theme-plain',
        closeByEscape: false,
        closeByDocument: false
      });
    };
	
	$scope.openModal = function(){
      ngDialog.open({
        template: '<p>Text in Modal Dialog</p>',
        plain: true,
        className: 'ngdialog-theme-default',
        closeByEscape: false,
        closeByDocument: false
      });
    };
	
	$scope.openDialog = function(){
      ngDialog.open({template: 'firstDialogId'});
    };
	
	$scope.openPlainDialog = function(){
      ngDialog.open({
        template: 'firstDialogId', //use template id defined in HTML
        className: 'ngdialog-theme-plain'
      });
    };
});

smartCommunityApp.controller('titleCtrl', function($scope, $rootScope){
//	$rootScope.menu_b = false;	
	
	$scope.menu_click = function(){
		$rootScope.menu_b = !$rootScope.menu_b;
	};
});

smartCommunityApp.controller('problemsCtrl', function($scope, $http){
	
	var high = window.screen.height;
	$scope.list = [];
	$(".problems").height(high-40);
	
	var sechigh = $(".problems").height();
	$(".box-body").height(sechigh-56-42);
	$(".box-body").css("overflow", "scroll");
	
	$scope.send = function(){
		var mydate = new Date();
		var t=mydate.toLocaleString();
		var obj;

		obj= {name:"用户",time:t,info:$scope.Introduction};
//		$scope.list.push(obj);
		$scope.list[$scope.list.length] = obj;
		$http.get("/smartCommunity/v1/UserProblems.smart",
				{params:{userName:'用户',userProblems:$scope.Introduction}}
			);
		$scope.Introduction="";
	}
});

smartCommunityApp.controller('aroundCtrl', function($scope, $http){
	
	var high = window.screen.height;
	$(".around").height(high-40);
	$(".around").css("overflow", "scroll");

	$http.get("/smartCommunity/v1/communitySurrounding.smart").success(function(data, status){
		$scope.business_list = data.businessBeans;
		$scope.shop_list = data.shopBeans;
	});

});

smartCommunityApp.controller('forumCtrl', function($scope, $http, ngDialog){
	
	var high = window.screen.height;
	$(".forum").height(high-40);
	$(".forum").css("overflow", "scroll");

	$http.get("/smartCommunity/v1/getArticles.smart").success(function(data, status){
		$scope.article_list = data.articleBeans;
	});

	$scope.sendArticle = function(){
		ngDialog.open({
			template:'views/sendArticle.html',
			showClose:false,
			closeByNavigation:true,
			controller: ['$scope', 'ngDialog', function($scope, ngDialog) {
				$scope.user_register = function(){
					ngDialog.open({
						template:'views/user_register.html',
						showClose:false,
						closeByNavigation:true,
						className: 'ngdialog-theme-plain'
					})
				}
			}],
			className: 'ngdialog-theme-plain'
		})
	}
});

smartCommunityApp.controller('homeCtrl', function($scope){
	
	var high = window.screen.height;
	$(".homepage").height(high-40);
	$(".homepage").css("overflow", "scroll");
	
	$scope.noapply = function(){
		alert("该功能暂未开通 敬请更新");
	}

});

smartCommunityApp.controller('lifeCtrl', function($scope){
	
	var high = window.screen.height;
	$(".life").height(high-40);
	$(".life").css("overflow", "scroll");
});

smartCommunityApp.controller('menuCtrl', function($scope, $rootScope, ngDialog){
	$scope.user_login = function(){
		ngDialog.open({
			template:'views/user_login.html',
			showClose:false,
			closeByNavigation:true,
			controller: ['$scope', 'ngDialog', function($scope, ngDialog) {
				$scope.user_register = function(){
					ngDialog.open({
						template:'views/user_register.html',
						showClose:false,
						closeByNavigation:true,
						className: 'ngdialog-theme-plain'
					})
				}
			}],
			className: 'ngdialog-theme-plain'
		})
	}

	$scope.fade = function(){
		$rootScope.menu_b = !$rootScope.menu_b;
	}
});