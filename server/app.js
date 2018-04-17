const Koa = require('koa');
const Static = require('koa-static');
const path = require('path');
const cors = require('koa2-cors');//解决跨域问题  cors:跨域资源共享

const app = new Koa();

app.use(cors({
    origin:"http://localhost:3006"//允许跨域的域名 可以查看源代码
}));
const routers = require('./routers/index');

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = '../dist';
app.use(Static(path.join(__dirname,staticPath)));

/*加载路由中间件*/
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3007,'0.0.0.0',()=>{
    console.log('app is listening port of 3007');
});