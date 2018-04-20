const Vue = require("../libs/vue.min");
const Axios = require("../libs/axios.min");


let app;
Axios.get('http://47.104.226.230:3007/app/free-ssr/free')
    .then(function (response) {
        console.log(response);
        if(response.data.code==0){
            app = new Vue({
                el: "#ssr",
                data: {
                    items: response.data.data,
                },
                created:function(){
                    console.log(this.items)
                },
                methods: {}
            });
        } else {
            alert(`抓取${response.data.message}网站有误，请稍后重试`)
        }
    })
    .catch(function (error) {
        console.log(error);
    });

module.exports = app;