const render = require('../utils/render');
const sha1 = require('sha1');
const superagent = require('superagent');


const config = {
    wechat: {
        appID: "wx9d7bb7be5fbd9b38",
        appSecret: "decfd72b47e6ab23618781a15a6c5ea1",
        token: "weixin",
        apiDomain: "https://api.weixin.qq.com",
        apiURL: {
            accessTokenApi: `/cgi-bin/token?grant_type=client_credential&appid=wx9d7bb7be5fbd9b38&secret=decfd72b47e6ab23618781a15a6c5ea1`,
            jsApiTicket: `/cgi-bin/ticket/getticket?type=jsapi&access_token=`
        }
    }
};

module.exports.verifyToken = async (ctx) => {
    var token = config.wechat.token;
    var signature = ctx.query.signature;
    var nonce = ctx.query.nonce;
    var timestamp = ctx.query.timestamp;
    var echostr = ctx.query.echostr;
    var str = [token, timestamp, nonce].sort().join("");
    var sha = sha1(str);
    console.log(ctx.query);
    if (sha === signature) {
        ctx.body = echostr;
    } else {
        ctx.body = ":wrong from shinelp100";
    }
};

const fs = require('fs');
const accessTokenJson = require('../access_token'); //引入本地存储的 access_token
var WeChat = function (config) {
    this.config = config;
    this.appID = config.appID;
    this.apiDomain = config.apiDomain;
    this.apiURL = config.apiURL;

    this.requestGet = function (url) {
        return new Promise((resolve, reject) => {
            superagent.get(url)
                .end(async (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(res);
                })
        })
    }
};
/*
* 获取微信access_token
* */

WeChat.prototype.getAccessToken = async function () {
    var that = this;
    return new Promise((resolve, reject) => {
        var currentTime = new Date().getTime();
        var url = that.apiDomain + that.apiURL.accessTokenApi;
        if (accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime) {
            that.requestGet(url).then((data) => {
                var data = data.body;
                if (data.toString().indexOf("errcode") < 0) {
                    accessTokenJson.access_token = data.access_token;
                    accessTokenJson.expires_time = new Date().getTime() + (parseInt(data.expires_in) - 200) * 1000;
                    //更新本地存储的
                    fs.writeFile('./access_token.json', JSON.stringify(accessTokenJson), (error) => {
                        console.log(error);
                    });
                    //将获取后的 access_token 返回
                    resolve(data);
                } else {
                    reject(data);
                }
            })
        } else {
            //将本地存储的 access_token 返回
            resolve(accessTokenJson);
        }
    })
}

const jsApiTicket = require('../jsapi_ticket'); //引入本地存储的 access_token

WeChat.prototype.getJsApiTicket = async function () {
    var that = this;
    return new Promise(async (resolve, reject) => {
        var currentTime = new Date().getTime();
        var access_token = await this.getAccessToken().then((data) => {
            return data.access_token;
        });
        var url = that.apiDomain + that.apiURL.jsApiTicket + access_token;
        if (jsApiTicket.jsapi_ticket === "" || jsApiTicket.expires_time < currentTime) {
            that.requestGet(url).then((data) => {
                var data = data.body;
                if (data.toString().indexOf("errcode") < 0) {
                    jsApiTicket.jsapi_ticket = data.ticket;
                    jsApiTicket.expires_time = new Date().getTime() + (parseInt(data.expires_in) - 200) * 1000;
                    //更新本地存储的

                    fs.writeFile('./jsapi_ticket.json', JSON.stringify(jsApiTicket), (error) => {
                        console.log(error);
                    });
                    //将获取后的 access_token 返回
                    resolve(data);
                } else {
                    reject(data);
                }
            })
        } else {
            //将本地存储的 access_token 返回
            resolve(jsApiTicket);
        }
    })
}

var sign = require('./sign.js');

module.exports.getAccessToken = async (ctx) => {
    if(ctx.query.url){
        var wechatApp = new WeChat(config.wechat);
        var data = await wechatApp.getJsApiTicket().then((data) => {
            return data;
        });
        var signData = sign(data.jsapi_ticket, ctx.query.url);
        ctx.body = signData;
    } else {
        ctx.body = "请携带上url：页面地址";
    }
};