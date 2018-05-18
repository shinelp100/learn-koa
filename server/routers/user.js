const router = require("koa-router")();
const render = require("../utils/render");
const bodyParser = require('koa-bodyparser');
const User = require("../controllers/user.js");

router.get(['/login','/login.html'],async (ctx)=>{
        if(ctx.session && ctx.session.isLogin && ctx.session.userName ){
            ctx.redirect('/free-ssr');
        } else {
            ctx.body = await render('login');
        }
    })
    .get(['/register','register.html'],async (ctx)=>{
        if(ctx.session && ctx.session.isLogin && ctx.session.userName ){
            ctx.redirect('/free-ssr');
        } else {
            ctx.body = await render('register');
        }
    })
    .post('/login',bodyParser(),User.login)
    .post('/register',bodyParser(),User.register);

module.exports = router;