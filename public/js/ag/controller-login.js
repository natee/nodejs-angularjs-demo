// 登陆模块
function LoginCtrl($rootScope, $scope, $location, $http, $api) {
    $rootScope.pageView = 'login';
	$rootScope.global = {};

    // 登陆表单信息
    $scope.loginData = {
        username : '',
        password: ''
    };

    // 存储错误变量
    $scope.error = {};

    $scope.login = function() {
		
        if($scope.loginData.username == ''){
            $scope.error.usernameErr = true;
			$scope.loginErrText = '用户名不能为空';
            return false;
        }else{
            $scope.error.usernameErr = false;
        }

        if($scope.loginData.password == ''){
            $scope.error.pwdErr = true;
			$scope.loginErrText = '密码不能为空';
            return false;
        }else{
            $scope.error.pwdErr = false;
        }
		$scope.loginErrText = '';

        $api.user.login($scope.loginData).then(function(data){
			var r = data.data;

			if(r.status === 0){
				$scope.loginErrText = '';
				$rootScope.global.user = r.result;
				$location.path('/index');
			}else if(r.status === 1){
				$scope.loginErrText = '用户不存在';
			}else if(r.status === 2){
				$scope.loginErrText = '密码错误';
			}
        });
    }
}