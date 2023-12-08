const AddPrefixToSourceMapUrlPlugin = require('./plugins/AddPrefixToSourceMapUrlPlugin');
module.exports = {
  //   mode:
  lintOnSave: false,
  publicPath: '.',
  configureWebpack: (config) => {
    config.output.sourceMapFilename = 'sourcemap/[file].map'

    config.plugins.push(
      new AddPrefixToSourceMapUrlPlugin("http://localhost:1234")
    );
  },
  devServer: {
    compress: true, // 开启gzip压缩
    disableHostCheck: true, // 绕过主机检查，解决Invalid Host header问题
    proxy: {
      "/getSignature|checkout": {
        // 本地项目api名称可以重写
        // pathRewrite: { "^/api": '/getSignature' },
        // 代理到本地node地址
        target: "http://127.0.0.1:3000",
        // changeOrigin: true // 修改请求头host
      },
    },
  },
};
