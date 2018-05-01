const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...")
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printResult(result.rows)
    client.end();
  });
});

const printResult = (resultArray) => {
  resultArray.forEach(function(element, i){
    let seq = i + 1;
    let firstName = element.first_name;
    let lastName = element.last_name;
    let birthDate = element.birthdate.toISOString().slice(0, 10);
    console.log(`- ${seq}: ${firstName} ${lastName}, born ${birthDate}`)
  });
}
