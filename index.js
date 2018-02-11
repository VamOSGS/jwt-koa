const jwt = require('jsonwebtoken');

exports.middleware = async (ctx, next) => {
    const { SECRET } = process.env;
    const token = ctx.request.body.token || ctx.headers.authorization;
    if (token) {
        jwt.verify(token, SECRET, (err) => {
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

exports.createToken = (data, expiresIn = 3000) => {
    const { SECRET } = process.env;
    return jwt.sign(data, SECRET, {
        expiresIn,
    });
};
