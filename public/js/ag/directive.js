angular.module('studio')
    .directive('topNav', topNavDirective);

/**
 * 顶部个人设置导航
 */
topNavDirective.$inject = ['$rootScope','$location'];
function topNavDirective($rootScope,$location) {
    return {
        restrict: 'A',
        templateUrl: '/partials/top-nav.html',
        $scope: true,
        link: function($scope, element, attrs) {
            $scope.logout = function() {
                $rootScope.pageView = 'login';
                $location.path('#/login');
            }
        }
    }
}
