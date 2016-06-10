function PollListCtrl($rootScope, $scope, $api, $location, $timeout) {
    $rootScope.pageView = 'other';

    // TODO get user info
    var user = {
        _id: '123123',
        name: 'test'
    }

    // 测试数据
    $scope.lists = [{
        text: 'list 1',
        userId: '_1',
        userName: 'user 1',
        pubTime: new Date()
    },
    {
        text: 'list 2',
        userId: '_2',
        userName: 'user 2',
        pubTime: new Date()
    }]; // 说说列表

    $scope.addItem = {

        newInfo: {
            text: ''
        },

        // 发布说说
        pub: function() {

            if (this.newInfo.text == '') {
                alert('说点什么吧');
                return false;
            }

            var data = {
                text: this.newInfo.text,
                userId: user._id,
                userName: user.name,
                pubTime: (new Date()).getTime() //Date.now(), // 注意：这里不能直接用 new Date()
            };

            $api.list.pub(data).then(function(res) {
                var r = res.data;
                if (r.status === 0) {
                    $scope.addItem.newInfo = {
                        text: ''
                    };
                    getAllList();
                }
            });
        }
    };

    function getAllList() {
        $api.list.getAllList({})
            .then(function(data) {
                var r = data.data;
                if (r.status === 0) {
                    $scope.lists = r.result.reverse(); // 根据时间降序
                }
            });
    }

}
