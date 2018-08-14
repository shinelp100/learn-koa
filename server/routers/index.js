/*
* 整合所有子路由
* */
const Router = require('koa-router');
const router = new Router();
/*创建路由模块*/
const home = require('./home');
const freeSsr = require('./free-ssr');
const user = require('./user');
const page = require('./page');
const wx = require('./wx');
const error = require('./error');

router.use('',wx.routes(),wx.allowedMethods());
router.use('/app/',home.routes(),home.allowedMethods());
router.use('/user',user.routes(),user.allowedMethods());
router.use('/free-ssr',freeSsr.routes(),freeSsr.allowedMethods());
router.use('/app/page',page.routes(),page.allowedMethods());


/*放在最后面去匹配找不大的页面*/
router.use('*',error.routes(),error.allowedMethods());


module.exports = router;