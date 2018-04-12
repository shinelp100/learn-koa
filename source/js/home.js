const Vue = require("../libs/vue.min");
const Axios = require("../libs/axios.min");


let app;
Axios.get('/app/home')
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