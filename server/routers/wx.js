/**
 * 微信分享测试路由
 */
const router = require('koa-router')();
const Wx = require('../controllers/wx');


module.exports = router
    .get('/api/wechat', Wx.verifyToken)
    .get('/weixin/auth',Wx.getAccessToken);