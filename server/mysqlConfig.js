let mysql = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mimi333',
    database : 'react_recipe'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to react-recipe database.");
});

module.exports = connection;