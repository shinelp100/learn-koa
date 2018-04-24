const Vue = require("../libs/vue.min");
const Axios = require("../libs/axios.min");


let app = new Vue({
    el: "#ssr",
    data: {
        items: [],
        URL:""
    },
    created:function(){
        this.getUrl();
    },
    methods: {
        addSSRAddress:function(){
            var vm = this;
            Axios.post('http://47.104.226.230:3007/app/free-ssr/url',{
                URL:vm.URL
            }).then(function(response){
                    if(response.data.code==0){vm.getUrl();vm.URL = "";return;}
                    alert(response.data.message);
                })
                .catch(function(error){console.log(error);})
        },
        getUrl:function(){
            var _this = this;
            Axios.get('http://47.104.226.230:3007/app/free-ssr/free')
                .then(function (response) {
                    if(response.data.code==0){
                        _this.items = response.data.data
                    } else {
                        alert(`抓取${response.data.message}网站有误，请稍后重试`)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
});
Vue.config.devtools = true;
module.exports = app;