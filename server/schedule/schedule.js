const schedule = require('node-schedule');
const {Spider} = require('../utils/spider');
const { query,insertData } = require('../utils/async-db');
const toArr = require('../utils/toArr');

async function selectAllData() {
    let sql = 'SELECT * FROM freesite';
    let dataList = await query(sql);
    return JSON.parse(JSON.stringify(dataList));
}
/*添加定时任务*/
let j = schedule.scheduleJob('6 6 0,6,12,18 * * *', async ()=>{
    let url = await selectAllData();
    let spider = new Spider(url[0]["URL"]);
    let spiderData = await spider.spider();
    let data = toArr(spiderData);
    await insertData([data]);
});