const Vue = require("../libs/vue.min");
const Axios = require("../libs/axios.min");

/*添加手动删除不能用的账号*/
Vue.component("my-component",{
    template:`
        <tr>
            <td>{{data.IPAddress}}</td>
            <td>{{data.Port}}</td>
            <td>{{data.Password}}</td>
            <td>{{data.Method}}</td>
            <td><a :href=\"data.imgUrl\" target="_blank">ShadowSocks</a></td>
            <td><span @click="$emit('remove')">删除</span></td>
        </tr>
    `,
    props:["data"]
});

/*props参数不能使驼峰parentData  楼主爬坑*/

let app = new Vue({
    el: "#ssr",
    data: {
        items: [],
        noData:false
    },
    created:function () {
        var _this = this;
        Axios.get('http://47.104.226.230:3007/app/home')
            .then(function (response) {
                if(response.data.code==0){
                    if( response.data.spiderData.length === 0 ){
                        _this.noData = true;
                    } else {
                        _this.noData = false;
                        _this.items = response.data.spiderData
                    }
                } else {
                    alert(`抓取${response.data.message}网站有误，请稍后重试`)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    },
    methods: {

    }
});
module.exports = app;