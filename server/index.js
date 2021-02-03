const express = require('express');
const bodyParser = require('body-parser')
var session = require('express-session');
const recipes = require('./routes/recipesRoutes.js')
const user = require('./routes/userRoutes.js')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
  secret: 'secret-react-recipe-session',
  resave: true,
  saveUninitialized: true
}));

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin','*');
  // res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  next();
});

app.use(`/recipes`, recipes);
app.use(`/user`, user)

// set port, listen for requests
app.listen(PORT, () => {
    console.log("Server is running on port 3001.");
  });
