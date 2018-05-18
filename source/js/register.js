const Vue = require('../libs/vue.min');
const Axios = require('../libs/axios.min');
var vm = new Vue({
    el:"#register",
    data:{
        username:"",
        password:"",
        affirm:""
    },
    methods:{
        submit:function(){
            var vm = this;
            if(this.username.replace(/ /g,'') && this.password.replace(/ /g,'') && this.affirm.replace(/ /g,'') && this.password.replace(/ /g,'')===this.affirm.replace(/ /g,'')) {
                Axios.post("/user/register",{
                    name:vm.username,
                    password:vm.password,
                    affirm:vm.affirm
                }).then(function(response){
                    if( response.data.code === 0 ){
                        location.href = "/free-ssr"
                    } else {
                        alert(response.data.message);
                    }
                }).catch(function(err){
                    console.log(err);
                });
            } else if(this.password.replace(/ /g,'')!==this.affirm.replace(/ /g,'') && this.affirm.replace(/ /g,'')&&this.password.replace(/ /g,'')){
                alert("两次输入的密码不一致");
            } else {
                alert("用户名或密码不能为空");
            }
        }
    }
});

Vue.config.devtools = true;