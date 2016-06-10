module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt); //加载所有的任务

    // 配置Grunt各种模块的参数
    grunt.initConfig({
        connect: {
            options: {
                hostname: "0.0.0.0", // Windows失败,Mac正常且可跨机访问
                //hostname:'127.0.0.1', // 均正常，但无法实现跨机访问
                keepalive: true,
                open: false
            },
            proxies: [{
               
            }],
            server: {
                options: {
                    port: 9002,
                    protocol: "http",
                    middleware: function(connect) {
                        return [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            connect.static('./')
                        ];
                    }
                }
            }

        }
    });

    // 从node_modules目录加载模块文件
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');

    // 默认启动mc，合并
    grunt.registerTask('default', ['configureProxies','connect:server']);

};
