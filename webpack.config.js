const path = require('path');

module.exports = {
  entry: [
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
                '@babel/typescript',
                [
                  '@babel/preset-env',
                  {
                    "modules": "umd",
                    "useBuiltIns": "usage",
                    "targets": {
                      "ie": "11"
                    }
                }]
              ]
            }
          },
          "ts-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js(x?)$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    "modules": "umd",
                    "useBuiltIns": "usage",
                    "targets": {
                      "ie": "11"
                    }
                  }
                ]
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    // ...
    host: '0.0.0.0',
    port: 8080,
    // ...
  }
};
