//这是vue的配置项
module.exports = {
    devServer:{
        // 解决跨域问题配置
        //配置代理
        proxy:'http://localhost:3000'
    }
}