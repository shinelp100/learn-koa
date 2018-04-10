const Koa = require('koa');
const Static = require('koa-static');
const path = require('path');

const app = new Koa();

const routers = require('./routers/index');

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = '../dist/app';
app.use(Static(path.join(__dirname,staticPath)));

/*加载路由中间件*/
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3007,()=>{
    console.log('app is listening port of 3007');
});