const Axios = require("../libs/axios.min");
const wx = require("weixin-js-sdk");
var params = {
    appId:"wx9d7bb7be5fbd9b38",
    title:"shinelp100",
    des:"shinelp100 开始尝试分享啦!",
    link:location.href,
    imgUrl:"https://admin.hbctcf.com/upload/link/link1533804269965419.jpg"
}

Axios.get('/get/accessToken', {params: {url: location.href}})
    .then((response) => {
        wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: params.appId, // 必填，公众号的唯一标识
            timestamp: response.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
            signature: response.data.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: params.title, // 分享标题
                desc: params.des, // 分享描述
                link: params.link, // 分享链接
                imgUrl: params.imgUrl, // 分享图标
                success: function () {
                    alert("我是微信好友成功回调");
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    alert("我是微信好友取消分享回调");
                }
            });
            wx.onMenuShareTimeline({
                title: params.title, // 分享标题
                link: params.link, // 分享链接
                imgUrl: params.imgUrl, // 分享图标
                success: function () {
                    alert("我是微信朋友圈成功回调");
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    alert("我是微信朋友圈取消分享回调");
                }
            });
        });
        wx.error(function (res) {
            console.log(res);
        });
    })
    .catch(error => {
        console.log(error)
    })