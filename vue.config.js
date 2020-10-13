const path = require('path');
const config = require("./src/config");

function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "assets/css/public.scss";`
            }
        }
    },
    chainWebpack: config => {
        // 路径别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
    },   
    // 开发环境访问地址、代理等配置
    devServer: {
        host: '0.0.0.0',
        port: '9000',
        proxy: {
            '/api': {
                target: config.baseUrl,
                changeOrigin: true, // 跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
