const jwt = require('jsonwebtoken');

const { secret } = process.env;
module.exports = async (ctx, next) => {
    const token = ctx.request.body.token || ctx.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err) => {
            if (err) {
                ctx.body = {
                    message: 'BAD TOKEN',
                };
            } else {
                next();
            }
        });
    } else {
        ctx.body = {
            message: 'NO TOKEN',
        };
    }
};
