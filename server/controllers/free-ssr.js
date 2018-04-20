const render = require('../utils/render');
const {query} = require('../utils/async-db');

async function selectAllData() {
    let sql = 'SELECT * FROM freesite';
    let dataList = await query(sql);
    return dataList;
}

module.exports = async (ctx) => {
    let dataList = await selectAllData();
    if (ctx.url === "/app/free-ssr/free") {
        let data = {};
        if (dataList === 'error') {
            data.code = 1;
            data.message = url;
        } else {
            data.code = 0;
            data.data = JSON.parse(JSON.stringify(dataList));
        }
        ctx.body = data;
    } else {
        ctx.body = await render('free-ssr');
    }
};
