const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
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
  module: {
    rules: [
    //处理css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
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
                ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] 
              ]
          }
      }               
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
        hash:true//给生成的js/css文件添加一个唯一的hash
        // chunks:['common','index']
    })
  ],
  //webpack-dev-server 
  devServer:{
    contentBase: './dist',//内容的目录
    // port:8080//服务运行的端口
    historyApiFallback:true
  }
};