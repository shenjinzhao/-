const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/eSignature",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
    })
  );
};
