const Vue = require("../libs/vue.min");
const Axios = require("../libs/axios.min");


let app;
Axios.get('http://47.104.226.230:3007/app/home')
    .then(function (response) {
        if(response.data.code==0){
            app = new Vue({
                el: "#ssr",
                data: {
                    items: response.data.spiderData,
                    noData:false
                },
                created:function () {
                    this.noData = this.items.length === 0 ?true : this.noData;
                },
                methods: {

                }
            });
        } else {
            alert(`抓取${response.data.message}网站有误，请稍后重试`)
        }
    })
    .catch(function (error) {
        console.log(error);
    });

module.exports = app;