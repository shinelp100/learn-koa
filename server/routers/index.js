/*
* 整合所有子路由
* */
const Router = require('koa-router');

const router = new Router();

const home = require('./home');
const page = require('./page');
const error = require('./error');

router.use('/',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());
/*放在最后面去匹配找不大的页面*/
router.use('*',error.routes(),error.allowedMethods());


module.exports = router;