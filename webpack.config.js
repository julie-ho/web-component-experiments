const path = require('path');

module.exports = {
  entry: [
    "@babel/polyfill",
    path.join(__dirname, '/app.ts')
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, '/dist/')
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loaders: [
          "babel-loader",
          "ts-loader"
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
  // devServer: {
  //   // ...
  //   host: '0.0.0.0',
  //   port: 8080,
  //   // ...
  // }
};
