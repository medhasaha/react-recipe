const express = require('express');
const bodyParser = require('body-parser')
const recipes = require('./routes/recipesRoutes.js')

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type');
  
  next();
});

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/recipes`, recipes)

// set port, listen for requests
app.listen(3001, () => {
    console.log("Server is running on port 3001.");
  });
