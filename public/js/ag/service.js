angular.module('serviceName', ['ngResource'])
.service('$api', ['$http', function($http) {
    return {
		user:{
			login: function(data){
				return $http.post('/api/user/login', {
					username: data.username,
					password: data.password
				});
			}
		},

		list: {
			getAllList: function(data){
				return $http.post('/api/list/all', data);
			},

			pub: function(data){
				return $http.post('/api/list/pub', data);
			}
		}
    }
}]);
