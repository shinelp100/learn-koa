const schedule = require('node-schedule');
const {query} = require("../utils/async-db");

async function delOldData() {
    let _sql = "DELETE FROM ssr where date <= date_sub(now(),interval 2 day)";
    await query(_sql);
}

let j = schedule.scheduleJob('36 6 6 * * *',async ()=>{
    await delOldData();
    console.log("shinelp100");
});