const schedule = require('node-schedule');
const Spider = require('../utils/spider');
const { insertData } = require('../utils/async-db');
const toArr = require('../utils/toArr');

/*添加定时任务*/
let j = schedule.scheduleJob('6 6 0,6,12,18 * * *', async ()=>{
    let url = "https://get.ishadowx.net/";
    let spider = new Spider(url);
    let spiderData = await spider.spider();
    let data = toArr(spiderData);
    await insertData([data]);
});