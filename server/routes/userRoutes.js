const conn = require('../mysqlConfig.js');
const express = require("express");
const uuid = require('uuid');
const router = express.Router();

router.post('/signup', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
  console.log("signup",username, password, email)
	if (username && password && email) {
		// check if user exists
		conn.query('SELECT * FROM users WHERE email = ? ', [email], (err, result) => {
      if(err){
        console.log("server err", err)
        res.status(500).json({err : 1, errMsg : "Server Error"})
      }else if (result.length > 0) {
				res.status(409).json({err : 1, errMsg : "Email Already Exists"})
			}else {
        conn.query(`INSERT INTO users (uuid, username, email, password, createdAt, updatedAt) VALUES ('${uuid.v4()}', '${username}', '${email}', '${password}', now(), now())`, (err, results) => {
          if(err){
            console.log("server err", err)
            res.status(500).json({err : 1, errMsg : "Server Error"})
          }else{
            console.log("here success signup")
            res.status(200).json({success : 1});
            res.end();
          }
        })
			}           		
		});
	} else {
		res.send('Please enter Username, Password and Email!');
		res.end();
	}
});

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

    if (email && password) {
      conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err){
          console.log("server err", err);
          res.status(500).json({err : 1, errMsg : "Server Error"});
          res.end();
        }if (results.length > 0) {
          req.session.loggedin = true;
          req.session.user = results[0];
          let _uuid = results[0].uuid 
          conn.query(`SELECT ck.cookbook_id, ck.cookbook_name FROM cookbooks AS ck, users AS u WHERE ck.uuid = u.uuid AND u.uuid = '${_uuid}'`, (err, results) => {
            if(err){
              console.log("server err", err)
              res.status(500).json({err : 1, errMsg : "Server Error"})
            }else{
              res.status(200).json({success : 1, response : results});
              res.end();
            }
          })
        } else {
          res.status(400).json({err : 1, errMsg : 'Incorrect Username and/or Password!'});
          res.end();
        }           
      });
    } else {
      res.status(400).json({err : 1, errMsg : 'Please enter email and Password!'});
      res.end();
    }
  });

router.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        console.log("dashboard",req.session, req.sessionID)
        res.send('Welcome back, ' + req.session.user.username + '!');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
  });

router.get('/user', (req, res) => {
  console.log("user",req.session)
  if (req.session.loggedin) {
    res.status(200).json({result : req.session.user});
  } else {
    res.status(400).json({err : 1, errMsg : "User Not Logged In"});
  }
});

router.post('/createCookbook', (req, res) => {
  if (req.session.loggedin) {
    let _uuid = req.session.user.uuid;
    let cookbook_name = req.body.cookbookName;

    // let sqlQuery = `INSERT INTO cookbooks (uuid, cookbook_id, cookbook_name, createdAt, updatedAt) VALUES ('${_uuid}', '${uuid.v4()}', '${cookbook_name}', ${createdAt}, ${updatedAt})`;
    let sqlQuery = 'INSERT INTO cookbooks SET ?'
    let sqlObj = {
      uuid : _uuid,
      cookbook_id : uuid.v4(),
      cookbook_name : cookbook_name,
      createdAt : new Date(),
      updatedAt : new Date()
    }

    conn.query(sqlQuery, sqlObj, (err, results) => {
      if (err){
        console.log("server err", err)
        res.status(500).json({err : 1, errMsg : "Server Error"});
        res.end();
      }else {
        conn.query(`SELECT cookbook_id, cookbook_name FROM cookbooks WHERE uuid = '${_uuid}'`, (err, results) => {
          if(err){
            console.log("server err", err)
            res.status(500).json({err : 1, errMsg : "Server Error"})
          }else{
            res.status(200).json({success : 1, response : results});
            res.end();
          }
        })
      }           
    });
  } else {
    res.status(400).json({err : 1, errMsg : "User Not Logged In"});
    res.end();
  }
});

router.post('/bookmarkRecipe', (req, res) => {

});

module.exports = router;