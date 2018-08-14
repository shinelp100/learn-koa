const Koa = require('koa');
const Static = require('koa-static');
const path = require('path');
const cors = require('koa2-cors');//解决跨域问题  cors:跨域资源共享
const routers = require('./routers/index');
const config = require('./config');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const app = new Koa();

/*设置session存储位置*/
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};

/*配置session中间件*/
app.use(session({
    key:'SESSION_ID',
    store: new MysqlStore(sessionMysqlConfig),
    cookie: {
        path: '/',              // 写 cookie 所在的路径
        maxAge: 1000 * 60 * 5,      // cookie 有效时长
        httpOnly: true,         // 是否只用于 http 请求中获取
        overwrite: false        // 是否允许重写
    }
}));

app.use(cors({
    origin:"*"//允许跨域的域名 可以查看源代码
}));

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = '../dist';
app.use(Static(path.join(__dirname,staticPath)));

/*加载路由中间件*/
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port,'0.0.0.0',()=>{
    console.log('app is listening port of 80');
});