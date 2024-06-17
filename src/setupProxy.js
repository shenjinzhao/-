const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/eSignature",
    createProxyMiddleware({
      target: " http://192.168.0.121:20003/eSignature",
      changeOrigin: true,
    })
  );
};
