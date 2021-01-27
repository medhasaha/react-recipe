const conn = require('../mysqlConfig.js');
const express = require("express");
const router = express.Router();

router.post('/signup', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	if (username && password && email) {
		// check if user exists
		conn.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
      if(err){
        console.log("server err", err)
        res.status(500).json({err : 1, errMsg : "Server Error"})
      }else if (result.length > 0) {
				res.status(409).json({err : 1, errMsg : "UserName Already In Use"})
			}else {
        conn.query(`INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES ('${username}', '${email}', '${password}', now(), now())`, (err, results) => {
          if(err){
            console.log("server err", err)
            res.status(500).json({err : 1, errMsg : "Server Error"})
          }else{
            response.status(200).send("Successful");
            response.end();
          }
        })
			}           		
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.post('/login', function(request, response) {
  let email = request.body.email;
  let password = request.body.password;
    if (email && password) {
      conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err){
          console.log("server err", err)
          res.status(500).json({err : 1, errMsg : "Server Error"})
        }if (results.length > 0) {
          console.log(request.session)
          request.session.loggedin = true;
          request.session.user = results[0];
          response.status(200).send("Successful");
          response.end();
        } else {
          response.status(400).send('Incorrect Username and/or Password!');
        }           
    });
    } else {
      response.send('Please enter email and Password!');
      response.end();
    }
  });

router.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        console.log(req.session, req.sessionID)
        res.send('Welcome back, ' + req.session.user.username + '!');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
  });

module.exports = router;