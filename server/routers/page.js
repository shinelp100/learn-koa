/**
 * 主页子路由
 */
const router = require('koa-router')();
const page = require('../controllers/page');


module.exports = router
    .get(['/','/:postId'], page);