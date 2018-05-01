const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const firstName = process.argv[2]
const lastName = process.argv[3]
const birthDate = process.argv[4];
console.log(firstName, lastName, birthDate)

knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: birthDate})
.asCallback(function(err, rows) {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Import Successful!");
  knex.destroy();
});
