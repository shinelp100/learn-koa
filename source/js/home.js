const Vue = require("../libs/vue.min");
const Axios = require("../libs/axios.min");


let app;
Axios.get('/app/home')
    .then(function (response) {
        if(response.data.code==0){
            app = new Vue({
                el: "#ssr",
                data: {
                    items: response.data.spiderData
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