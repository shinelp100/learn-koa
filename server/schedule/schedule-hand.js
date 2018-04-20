const schedule = require('node-schedule');
const Spider = require('../utils/spider');
const {query, insertData} = require('../utils/async-db');
const toArr = require('../utils/toArr');

async function selectAllData() {
    let sql = 'SELECT * FROM freesite';
    let dataList = await query(sql);
    return JSON.parse(JSON.stringify(dataList));
}

/*手动执行定时任务执行一次*/
let j = async () => {
    let url = await selectAllData();
    let spider = new Spider(url[0]["site"]);
    let spiderData = await spider.spider();
    let data = toArr(spiderData);
    await insertData([data]);
    console.log("shinelp100");
};
j();
