const {query} = require('../utils/async-db');
const toArr = require('../utils/toArr');
const urlValid = require('url-valid');

async function selectAllData() {
    let sql = 'SELECT * FROM freesite';
    let dataList = await query(sql);
    return dataList;
}

module.exports.getFreeUrlList = async (ctx) => {
    let dataList = await selectAllData();
    let data = {};
    data.code = 0;
    data.message = "成功";
    data.data = JSON.parse(JSON.stringify(dataList));
    ctx.body = data;
};

/*添加插入的数据项新加URL地址*/
function insertURL(values){
    let _sql = `insert into freesite (URL) values ?`;
    return query(_sql,values);
}
/*验证url的有效性*/
function checkURL(url) {
    let data = {};
    return new Promise((resolve,reject)=>{
        urlValid(url).on("check", async (err,status)=>{
            if (err) {reject(err)}
            if(status){
                let URL = toArr([body]);
                //插入数据的格式[[[value],[value]]]
                await insertURL([URL]);
                data.code = 0;
                data.message = "成功";
                data.data = null;
            } else {
                data.code = 1;
                data.message = "URL无效";
                data.data = null;
            }
            resolve(data);
        });
    });
}


module.exports.add = async (ctx)=>{
    body = ctx.request.body;
    /*ctx.body不能放在异步方法中执行*/
    ctx.body = await checkURL(body.URL);
};
