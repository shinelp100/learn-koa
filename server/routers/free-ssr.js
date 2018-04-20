/**
 * 主页子路由
 */
const router = require('koa-router')();
const freeSsr = require('../controllers/free-ssr');

module.exports = router.get(['/','/free'], freeSsr);