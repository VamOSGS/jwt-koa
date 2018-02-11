# jwt-koa

## Simple mini-lib for secured APIs and servers with Koa and JWT.

[![NPM version](https://badge.fury.io/js/jwt-koa.svg)](http://badge.fury.io/js/jwt-koa)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

### What includes

* Middleware for checking request headers for token
* CreateToken function for creating token

### Setup

Install it:

```bash
npm install jwt-koa --save
```

or

```bash
yarn add jwt-koa
```

### Usage

#### Import

```js
const jwtKoa = require('jwt-koa');
```

#### Set secret key for JWT

```js
process.env.SECRET = 'secret';
```

#### Set middleware to secured Router

```js
securedRouter.use(jwtKoa.middleware);
securedRouter.get('/secured', async ctx => {
    ctx.body = { data: 'Secured Data' };
});
```

#### Send token to client

```js
notSecuredRouter.post('/send', async ctx => {
    const token = jwtKoa.createToken({ tokenData: 'tokenData' });
    // You can set expire time (3000 by default)
    const tokenWithExpireTime = jwtKoa.createToken(
        { tokenData: 'tokenData' },
        5000
    );
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
