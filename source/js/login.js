const Vue = require('../libs/vue.min');
const Axios = require('../libs/axios.min');
var vm = new Vue({
    el:"#login",
    data:{
        username:"",
        password:""
    },
    methods:{
        submit:function(){
            var vm = this;
            if(this.username.replace(/ /g,'') && this.password.replace(/ /g,'')) {
                Axios.post("/user/login",{
                    name:vm.username,
                    password:vm.password
                }).then(function(response){
                    if( response.data.code === 0 ){
                        location.href = "/free-ssr"
                    } else {
                        alert(response.data.message);
                    }
                }).catch(function(err){
                    console.log(err);
                });
            } else {
                alert("用户名或密码不能为空");
            }
        }
    }
});

Vue.config.devtools = true;