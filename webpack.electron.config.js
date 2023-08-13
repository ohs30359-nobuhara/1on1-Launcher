const path = require('path');

module.exports = {
  mode: "production",
  entry: './src/electron.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'electron.js',
  },
  target: 'electron-main',
  node: {
    __dirname: false, // __dirname を使用できるようにする
    __filename: false, // __filename を使用できるようにする
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            configFile: "tsconfig.electron.json",
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
