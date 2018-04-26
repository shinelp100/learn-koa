const {query} = require('../utils/async-db');

async function verify(ctx) {
    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    let data={} ;
    return new Promise(async (resolve,reject)=>{
        if(name && name!=="" && password && password!==""){
            let sql = "SELECT COUNT(*) AS num FROM user WHERE NAME='"+name+"'";
            let isExist = await query(sql);
            if(isExist[0].num === 0){
                data.code = 1;
                data.message = "用户名不存在";
            } else {
                /*数据库查询*/
                let _sql = 'SELECT password FROM user where name="'+name+'"';
                let sqlPassword = await query(_sql);
                /*存在问题查询出来的是数据集合*/
                if(sqlPassword[0].password === password){
                    data.code = 0;
                    data.message = "成功";
                    /*添加会话机制*/
                    let session = ctx.session;
                    session.isLogin = true;
                    session.userName = name;
                    session.userId = password;
                } else {
                    data.code = 1;
                    data.message = "用户名或密码有误";
                }
            }
        } else {
            data.code = 1;
            data.message = "用户名或密码不能为空";
        }
        data.data = null;
        resolve(data);
    });
}

module.exports.login = async (ctx)=>{
    ctx.body = await verify(ctx);
};