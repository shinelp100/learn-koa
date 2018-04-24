const {query} = require('../utils/async-db');
const toArr = require('../utils/toArr');

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

module.exports.add = async (ctx)=>{
    body = ctx.request.body;
    let data = {};
    if(body.URL && body.URL !== ""){
        let URL = toArr([body]);
        //插入数据的格式[[[value],[value]]]
        await insertURL([URL]);
        data.code = 0;
        data.message = "成功";
        data.data = null;
    } else {
        data.code = 1;
        data.message = "URL不能为空";
        data.data = null;
    }
    ctx.body = data;
};
