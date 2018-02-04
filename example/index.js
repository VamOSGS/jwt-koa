const jwt = require('../index');
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const notSecuredRouter = new Router();
const securedRouter = new Router();
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { SECRET } = process.env;

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
notSecuredRouter.get('/notsecured', async (ctx) => {
    ctx.body = 'Not secured Data';
});

notSecuredRouter.post('/send', async (ctx) => {
    const token = jwt.createToken({ tokenData: 'tokenData' });
    ctx.response.body = token;
});

securedRouter.use(jwt.middleware);
securedRouter.get('/secured', async (ctx) => {
    ctx.body = 'Secured Data';
});
app
    .use(securedRouter.routes())
    .use(securedRouter.allowedMethods())
    .use(notSecuredRouter.routes())
    .use(notSecuredRouter.allowedMethods());
