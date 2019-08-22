const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getHtmlConfig = (name)=>({
    template:'./src/views/'+name+'.html',
    filename:name+'.html',
    hash:true,
    chunks:['common',name]
})

module.exports = {
    //指定环境
    mode:'development',
    //多入口
    entry:{
        common:'./src/pages/common/index.js',
        index:'./src/pages/index/index.js',
        list:'./src/pages/list/index.js'
    },
    //出口
    output: {
        filename: 'js/[name]-[hash]-bundle.js',
        //指定输出参考根路径
        publicPath:'/',
        //所有输出文件的目标路径
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            common:path.resolve(__dirname,'./src/common'),
            api:path.resolve(__dirname,'./src/api')
        }
    },    
    module: {
        rules: [
        //处理css文件
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    "css-loader"
                ]
            },       
        //处理图片
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 400
                        }
                    }
                ]
            },
        //bable
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','es2015','stage-3'],
                    },
                }
            },           
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin(getHtmlConfig('index')),
        new htmlWebpackPlugin(getHtmlConfig('list')),        
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash]-bundle.css'
        })
    ],
    devServer: {
        contentBase: './dist',//内容的目录
        port:3001,//指定服务端口
        historyApiFallback:true//让h5路由不向后端发送请求
    }               
}