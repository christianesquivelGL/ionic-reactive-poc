/* eslint-disable @typescript-eslint/no-var-requires */
const Parse = require('parse/node');
const _ = require('lodash');

const parseAppId = '0smc8Z0Y7meBBfPlyQRAuCpeuVhndKk8FUelIywH';
const parseJSKey = 'fa4YC70zCRmTCmxYWVvkYpRrIh0rzCPvbdV8rIaC';
const parseServerUrl = 'https://parseapi.back4app.com/';

Parse.initialize(parseAppId, parseJSKey);
Parse.serverURL = parseServerUrl;

const currentUser = Parse.User.current();
if (currentUser) {
  Parse.User.logOut();
  console.log('Logged out users');
}

main().then((r) => console.log(r));

async function main() {
  var user = new Parse.User();
  user.set('username', 'labsuser@mailinator.com');
  user.set('email', 'labsuser@mailinator.com');
  user.set('name', 'Chris');
  user.set('lastName', 'Esquivel');
  user.set('password', 'labs123');
  user.set('blocked', false);

  return await user.signUp();
}
