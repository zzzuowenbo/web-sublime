const path = require('path');

module.exports = {
  mode:'development',
  // mode:'production',
  //单一入口
  // entry: './src/index.js',
  // entry: {main:'./src/index.js'},
  //多入口
  entry: {
  	index: "./src/index.js",
  	about: "./src/about.js",
  	contact: "./src/contact.js"
  },
  output: {
    // filename: '[name]-bundle.js',
    filename: '[name]-[hash]-bundle.js',
    path: path.resolve(__dirname,'dist')
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
		}		
    ]
  }
};