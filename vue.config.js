module.exports = {
  //   mode:
  lintOnSave: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== "production") {
      config.devtool = "cheap-source-map";
    }
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
