//开发环境配置
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.resolve(__dirname,'./src');
const commonSet = require('./webpack.common.js');
const config = {
  entry:commonSet.entry,
  devtool: commonSet.devtool,//定位错位位置
  devServer:{//浏览器自动刷新,需下载webpack-dev-server
    contentBase:path.join(__dirname, "dist"),
    port:8000,
    hot:true,//开启热更新
  },
  module:commonSet.module,
  plugins:[
    //new webpack.optimize.UglifyJsPlugin(),//压缩打包后文件
    new ConsoleLogWebpackStart(),//自定义插件
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'//node提供的常量api
        }
    })
  ].concat(commonSet.plugins),
  resolve:commonSet.resolve
}
function ConsoleLogWebpackStart(){

}
ConsoleLogWebpackStart.prototype.apply = function(compiler){
    compiler.plugin('run',function(compiler,callback){
      console.log('package start!');
      callback();
    })
}
module.exports = config;
