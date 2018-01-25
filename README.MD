# jwt-koa

## Simple middleware for secured APIs and servers with Koa.

[![NPM version](https://badge.fury.io/js/jwt-koa.svg)](http://badge.fury.io/js/jwt-koa)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

### Setup

Install it:

```bash
npm install jwt-koa jsonwebtoken --save
```

or

```bash
yarn add jwt-koa jsonwebtoken
```

### Usage

#### Import

```js
const jwtKoa = require('jwt-koa');
```

#### Set middleware to secured Router

```js
process.env.secret = 'SECRET';

securedRouter.use(jwtKoa);
securedRouter.get('/secured', async ctx => {
    ctx.body = { data: 'Secured Data' };
});
```

#### Send token to client

```js
notSecuredRouter.post('/send', async ctx => {
    const token = jwt.sign({ data: 'DATA' }, process.env.secret, {
        expiresIn: 3000
    });
    ctx.response.body = token;
});
```

### Client-side example

```js
fetch('/secured', { method: 'GET', headers: { Authorization: /* There is token from backend*/ } })
    .then(j => j.json())
    .then(data => /* There is secured data*/);
```

#### [Usage example](https://github.com/VamOSGS/jwt-koa/blob/master/example/index.js)
