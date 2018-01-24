const jwtKoa = require('../index');
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const app = new Koa();
const notSecuredRouter = new Router();
const securedRouter = new Router();

process.env.secret = 'SECRET';

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
notSecuredRouter.get('/notsecured', async (ctx) => {
    ctx.body = 'Not secured Data';
});

notSecuredRouter.post('/send', async (ctx) => {
    const token = jwt.sign({ data: 'DATA' }, process.env.secret, {
        expiresIn: 3000,
    });
    ctx.response.body = token;
});

securedRouter.use(jwtKoa);
securedRouter.get('/secured', async (ctx) => {
    ctx.body = 'Secured Data';
});
app
    .use(securedRouter.routes())
    .use(securedRouter.allowedMethods())
    .use(notSecuredRouter.routes())
    .use(notSecuredRouter.allowedMethods());
