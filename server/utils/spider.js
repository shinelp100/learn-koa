const cheerio = require('cheerio');//专为服务器设计的核心jQuery的快速，灵活和精益的实现。
const superagent = require('superagent');//SuperAgent是一个小型的渐进式客户端HTTP请求库，以及具有相同API的Node.js模块，体现了许多高级HTTP客户端功能
const moment = require('moment');//获取格式化时间

function Spider(url) {
    let self = this;

    self.url = url;//要抓取的网站地址

    self.spider = function () {
        return new Promise((resolve, reject) => {
            superagent.get(self.url)
                .end((err, res) => {
                    if (err) {
                        resolve("error");
                        return ;
                    }
                    let items = [];
                    let $ = cheerio.load(res.text,{normalizeWhitespace:true});
                    $(".hover-text").each(function(i,elem){
                        let $elem = $(elem);
                        items.push({
                            "IPAddress":$elem.find("h4").eq(0).find('span').eq(0).text(),
                            "Port":$elem.find("h4").eq(1).find('span').text(),
                            "Password":$elem.find("h4").eq(2).find('span').text(),
                            "Method":$elem.find("h4").eq(3).text().replace('Method:',''),
                            "imgUrl":$elem.find("h4").eq(4).find('a').attr('href')===undefined?"javascript:void(0);":url+"/"+$elem.find("h4").eq(4).find('a').attr('href'),
                            "date":moment().format('YYYY-MM-DD hh:mm:ss')
                        });
                        resolve(items);
                    });
                })
        })
    }
}

module.exports = Spider;