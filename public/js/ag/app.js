// Angular module, defining routes for the app
angular.module('studio', [
    'serviceName'
    ])
    .config(['$httpProvider', function($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '',
                name,
                value,
                fullSubName,
                subName,
                subValue,
                innerObj,
                i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = function(data) {
            if (angular.isObject(data) && String(data)) {
                var d2 = {};
                angular.copy(data, d2);
                return param(d2);
            } else {
                return data;
            }
        };
    }]).config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/index', {
            templateUrl: 'partials/main.html',
            controller: PollListCtrl
        }).
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: LoginCtrl
        }).
			otherwise({ redirectTo: '/login' });
    }]);
