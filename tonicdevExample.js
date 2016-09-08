// Replace every '<thing>' with your credentials:

const { createSession, loginBySessionInfo } = require('zermelo.js');

// create a session
const sessionInfo = await createSession('<schoolid>', '<authcode>');

// create an Zermelo instance using the created session
const zermelo = await loginBySessionInfo('<schoolid>', sessionInfo);

// get the info of the logged in user
const userInfo = await zermelo.userInfo();

// say hi
console.log(`Hey ${userInfo.firstName}!`);
