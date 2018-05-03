const schedule = require('node-schedule');
const {SpiderSszhfx} = require('../utils/spider');
const { query,insertData } = require('../utils/async-db');
const toArr = require('../utils/toArr');

async function selectAllData() {
    let sql = 'SELECT * FROM freesite';
    let dataList = await query(sql);
    return JSON.parse(JSON.stringify(dataList));
}
/*添加定时任务*/
let j = schedule.scheduleJob('8 8 9 25/3 * * ', async ()=>{
    let url = await selectAllData();
    let spider = new SpiderSszhfx(url[1]["URL"]);
    let spiderData = await spider.spider();
    let data = toArr(spiderData);
    await insertData([data]);
});