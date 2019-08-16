const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  //入口
  entry: {
  	index: "./src/index.js"
  },
  //出口
  output: {
    filename: '[name]-[hash]-bundle.js',
    path: path.resolve(__dirname,'dist'),
    publicPath:'/'
  },
  resolve:{
    alias:{
        pages:path.resolve(__dirname,'./src/page'),
        util:path.resolve(__dirname,'./src/util'),
        common:path.resolve(__dirname,'./src/common'),
        api:path.resolve(__dirname,'./src/api')
    }
  },
  module: {
    rules: [
    //处理css
      /*{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },*/
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
			      	limit: 10
			    }
			  }
			]
		},
    {
      test:/\.js$/,
      exclude: /(node_modules)/,
      use: {
          loader: 'babel-loader',
          options: {
              // presets: ['env', 'react'],
              presets: ['env','es2015','react','stage-3'],
              plugins: [
                ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }] 
              ]
          }
      }               
    },	
    {
      test: /\.less$/,
      use: [{
          loader: 'style-loader',
          }, {
          loader: 'css-loader', // translates CSS into CommonJS
          }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
              modifyVars: {
                'primary-color': '#1DA57A',
                'link-color': '#1DA57A',
                'border-radius-base': '2px',
              },
              javascriptEnabled: true,
          },
      }],
    }
    ]
  },
  //自动生成html
  plugins:[
    //清理输出文件夹
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
        template:'./src/index.html',//模板文件
        filename:'index.html',//输出的文件名
        // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
        hash:true,//给生成的js/css文件添加一个唯一的hash
        // chunks:['common','index']
    }),
    new MiniCssExtractPlugin({})
  ],
  //webpack-dev-server 
  devServer:{
    contentBase: './dist',//内容的目录
    port:3001,//服务运行的端口
    historyApiFallback:true
  }
};