const path = require('path');

module.exports = {
  entry: [
    '@babel/polyfill',
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
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {modules: 'umd', targets: {ie: '11'}}]
              ]
            }
          },
          "ts-loader"
        ]
      },
      {
        test: /\.js(x?)$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {modules: 'umd', targets: {ie: '11'}}]
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          "to-string-loader",
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            },
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
  // devServer: { enable for parallels testing
  //   // ...
  //   host: '0.0.0.0',
  //   port: 8080,
  //   // ...
  // }
};
