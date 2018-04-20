/*
* 整合所有子路由
* */
const Router = require('koa-router');

const router = new Router();

const home = require('./home');
const freeSsr = require('./free-ssr');
const page = require('./page');
const error = require('./error');

router.use('/app/',home.routes(),home.allowedMethods());
router.use('/app/free-ssr',freeSsr.routes(),freeSsr.allowedMethods());
router.use('/app/page',page.routes(),page.allowedMethods());
/*放在最后面去匹配找不大的页面*/
router.use('*',error.routes(),error.allowedMethods());


module.exports = router;