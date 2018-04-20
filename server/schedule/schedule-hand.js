const schedule = require('node-schedule');
const Spider = require('../utils/spider');
const { insertData } = require('../utils/async-db');
const toArr = require('../utils/toArr');
const { ishadowx } = require('../config/freeSSRUrl');

/*添加定时任务*/
let j = schedule.scheduleJob('*/3 0 0 * * *', async ()=>{
    let spider = new Spider(ishadowx);
    let spiderData = await spider.spider();
    let data = toArr(spiderData);
    await insertData([data]);
});