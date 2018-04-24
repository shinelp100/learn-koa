const router = require('koa-router')();
const render = require('../utils/render');
const bodyParser = require('koa-bodyparser');//中间件组合的路由实现解析post body体
const freeSsr = require('../controllers/free-ssr');//路由控制器

router.get("/", async (ctx)=>{
    ctx.body = await render('free-ssr');
})
    .get('/free',freeSsr.getFreeUrlList)
    .post('/url', bodyParser(), freeSsr.add);

module.exports = router;

/*
*  restful api
*
*  资源地址不能是动词、只能是名词，而且名词都是集合所以是复数
*  使用http动词实现具体操作：
*  GET（SELECT）：从服务器取出资源（一项或多项）。
*  POST（CREATE）：在服务器新建一个资源。
*  PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
*  PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
*  DELETE（DELETE）：从服务器删除资源。
*  HEAD：获取资源的元数据。
*  OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。
*
* */