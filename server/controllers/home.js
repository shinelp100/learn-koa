const render = require('../utils/render');

module.exports = async (ctx) => {
    ctx.body = await render('home');
};
