// path: NodeJS에서 파일 및 디렉토리 경로 작업을 위한 전역 모듈
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

// export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/js/index.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // 주석은 기본값!, `__dirname`은 현재 파일의 위치를 알려주는 NodeJS 전역 변수
    // path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },

  // 모듈 처리 방식을 설정
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          // 순서 중요!
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 제외할 경로
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/, 
        type: 'asset/resource' // 더 이상 file-loader는 사용하지 않는다
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    }),
    new Dotenv()
  ],

  // 개발 서버 옵션
  devServer: {
    historyApiFallback:true, // 새로고침시, 오류방지
    host: 'localhost',
    port: 8080,
    hot: true
  }
}