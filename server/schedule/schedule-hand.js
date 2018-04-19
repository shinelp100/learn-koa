const schedule = require('node-schedule');
const Spider = require('../utils/spider');
const { insertData } = require('../utils/async-db');
const toArr = require('../utils/toArr');

/*添加定时任务*/
let j = schedule.scheduleJob('*/3 * * * * *', async ()=>{
    let url = "https://free.ishadowx.net/";
    let spider = new Spider(url);
    let spiderData = await spider.spider();
    let data = toArr(spiderData);
    await insertData([data]);
});