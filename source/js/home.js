const Vue = require("../libs/vue.min");
const Axios = require("../libs/axios.min");


let app;
Axios.get('http://localhost:3007/app/home')
    .then(function (response) {
        app = new Vue({
            el: "#ssr",
            data: {
                items: response.data
            },
            methods: {}
        });
    })
    .catch(function (error) {
        console.log(error);
    });

module.exports = app;