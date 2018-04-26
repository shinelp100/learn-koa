const Vue = require("../libs/vue.min");
const Axios = require("../libs/axios.min");


let app = new Vue({
    el: "#ssr",
    data: {
        submit:"提交",
        items: [],
        URL:""
    },
    created:function(){
        this.getUrl();
    },
    methods: {
        addSSRAddress:function(){
            var vm = this;
            if(!this.URL) {
                alert("URL不能为空");
            } else {
                vm.submit = "提交中...";
                Axios.post('/free-ssr/url',{
                    URL:vm.URL
                }).then(function(response){
                    vm.submit = "提交";
                    if(response.data.code==0){vm.getUrl();vm.URL = "";return;}
                    alert(response.data.message);vm.URL = "";
                })
                    .catch(function(error){console.log(error);})
            }
        },
        getUrl:function(){
            var _this = this;
            Axios.get('/free-ssr/free')
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