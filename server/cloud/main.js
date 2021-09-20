const _ = require('lodash');

const Planet = Parse.Object.extend('Planet');

Parse.Cloud.define('v1_getPlanets', async (req) => {
  const query = new Parse.Query(Planet);
  query.ascending('name');

  console.log(req);
  console.log(_.VERSION);

  return query.find();
});
