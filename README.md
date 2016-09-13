# zermelo.js

[![Build Status](https://travis-ci.org/simplyGits/zermelo.svg?branch=master)](https://travis-ci.org/simplyGits/zermelo)
[![NPM](https://nodei.co/npm/zermelo.js.png?mini=true)](https://nodei.co/npm/zermelo.js/)

A Node implementation of the [Zermelo API](https://zermelo.atlassian.net/wiki/display/DEV).

Quickstart
===
`npm install zermelo.js`

```javascript
const { createSession, loginBySessionInfo } = require('zermelo.js');
// or with es6 modules:
// import { createSession, loginBySessionInfo } from 'zermelo.js'

// Replace every '<thing>' with your credentials:

// create a session
createSession('<schoolid>', '<authcode>')
	.then(sessionInfo => loginBySessionInfo('<schoolid>', sessionInfo)) // create an Zermelo instance using the created session
	.then(zermelo => zermelo.userInfo()) // get the info of the logged in user
	.then(user => console.log(`Hey ${user.firstName}!`)) // say hi
	.catch(err => console.error('something went wrong:', err)); // something went wrong
```

Useful links
===
* Documentation: http://www.simplyapps.nl/zermelo/index.html

Before creating issues
===
1. Update all your packages with `npm update`
2. Be sure you haven't made a typo and your code is correct (check the [docs](http://www.simplyapps.nl/zermelo/index.html))
3. Don't create issues which occur in a modified version

Contributing
===
* Document your code using [jsdoc](http://usejsdoc.org/)
* Respect and follow the current programming style
* Test your changes with `npm test`
* Check your code style with `eslint`
* Only commit the `src/` and `test/` directory

License
===
[LGPLv3](LICENSE)
