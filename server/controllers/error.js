const render = require('../utils/render');

module.exports = async (ctx)=>{
    ctx.type = 'html';
    ctx.body = await render('error');
};
