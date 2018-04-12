const render = require('../utils/render');
const Spider = require('../utils/spider');
const schedule = require('node-schedule');


module.exports = async (ctx) => {
    /*get请求对象ctx.query*/
    /*get请求ctx.request.querystring字符串 */

    let url = "https://get.ishadowx.net/";
    let spider = new Spider(url);
    let spiderData = await spider.spider();
    /*没必要做定时任务  每次新请求都会抓取新数据*/
    // let j = schedule.scheduleJob('*/10 * * * * *', async ()=>{
    //     spiderData = await spider.spider();
    //     spiderData = 1;
    //     ctx.body = spiderData;
    //     console.log("spiderData:",spiderData)
    // });
    if(ctx.url === "/app/home"){
        ctx.body = spiderData;
    } else {
        ctx.body = await render('home');
    }
};
