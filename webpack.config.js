const path = require('path');

module.exports = {
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'frontend/public'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'frontend/public'),
    compress: true,
    port: 9000
  }
};
