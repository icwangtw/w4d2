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

const input = process.argv[2];

const printResult = (resultArray, input) => {
  console.log(`Found ${resultArray.length} person(s) by the name ${input}:`)
  resultArray.forEach(function(element, i){
    let seq = i + 1;
    let firstName = element.first_name;
    let lastName = element.last_name;
    let birthDate = element.birthdate.toISOString().slice(0, 10);
    console.log(`- ${seq}: ${firstName} ${lastName}, born ${birthDate}`)
  });
};

knex.select().table('famous_people').where('first_name', input).orWhere('last_name', input)
.asCallback(function(err, rows) {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...")
  printResult(rows, input)
  knex.destroy()
});
