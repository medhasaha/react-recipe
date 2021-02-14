const conn = require('../mysqlConfig.js');
const express = require("express");
const uuid = require('uuid');
const router = express.Router();

router.post('/signup', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
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
  let cookbookIds = [];
  let recipeArr = [];
  //select ck.cookbook_id, cr.recipe_id from cookbooks as ck, cookbooks_recipes as cr where ck.uuid = '3377d2be-c59d-4bf9-af3d-ec5162be8fbb' AND ck.cookbook_id = cr.cookbook_id

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
          let userData = {
            "uuid" : results[0].uuid,
            "username" : results[0].username,
            "email" : results[0].email
          }
          conn.query(`SELECT ck.cookbook_id, ck.cookbook_name FROM cookbooks AS ck, users AS u WHERE ck.uuid = u.uuid AND u.uuid = '${_uuid}'`, (err, cookbook_results) => {
            if(err){
              console.log("server err", err)
              res.status(500).json({err : 1, errMsg : "Server Error"})
            }else{
              cookbook_results.map(item => {
                cookbookIds.push(item.cookbook_id);
              })
              conn.query(`SELECT recipe_id FROM cookbooks_recipes WHERE cookbook_id IN (?)`, [cookbookIds], (err, recipe_results) => {
                if(err){
                  console.log("server err", err)
                  res.status(500).json({err : 1, errMsg : "Server Error"})
                }else{
                  recipe_results.map(item =>{
                    recipeArr.push(item.recipe_id);
                  })
                  res.status(200).json({success : 1, 
                                        cookbooks : cookbook_results,
                                        recipes : recipeArr,  
                                        sessionID : req.sessionID, 
                                        user : userData});
                  res.end();
                }
              })
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
        res.status(200).json({success : 1});
      } else {
      res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
    }
    res.end();
  });

router.get('/user', (req, res) => {
  if (req.session.loggedin) {
    let userData = {
      "uuid" : req.session.user.uuid,
      "username" : req.session.user.username,
      "email" : req.session.user.email
    }
    res.status(200).json({result : req.session.user});
  } else {
    res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
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
            res.status(200).json({success : 1, results : results});
            res.end();
          }
        })
      }           
    });
  } else {
    res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
    res.end();
  }
});

router.post('/changeCookbook', (req, res) => {
  if (req.session.loggedin) {
    let recipe_id = req.body.recipe_id;
    let cookbook_id = req.body.cookbook_id
    let updatedAt = new Date()
    sqlQuery = `UPDATE cookbooks_recipes SET cookbook_id = '${cookbook_id}', updatedAt = ? WHERE recipe_id = '${recipe_id}'`;
    conn.query(sqlQuery, updatedAt, (err, results) => {
      if (err){
        console.log("server err", err)
        res.status(500).json({err : 1, errMsg : "Server Error"});
        res.end();
      }else {
        res.status(200).json({success : 1});
        res.end();
      }           
    });
  } else {
    res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
    res.end();
  }
});

router.post('/changeCookbookName', (req,res) => {
  if (req.session.loggedin) {
    let _uuid = req.session.user.uuid;
    let cookbook_id = req.body.cookbook_id;
    let new_name = req.body.new_name;
    let updatedAt = new Date()
    let sqlQuery = `UPDATE cookbooks SET cookbook_name = '${new_name}', updatedAt = ? WHERE cookbook_id = '${cookbook_id}'`;
    conn.query(sqlQuery, updatedAt, (err, results) => {
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
            res.status(200).json({success : 1, results : results});
            res.end();
          }
        })
      }           
    });
  } else {
    res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
    res.end();
  }
})

router.post('/deleteCookbook', (req, res) => {
  if (req.session.loggedin) {
    let _uuid = req.session.user.uuid;
    let cookbook_id = req.body.cookbook_id
    let cookbooks_delete_sqlQuery = `DELETE FROM cookbooks WHERE cookbook_id = '${cookbook_id}' AND uuid = '${_uuid}'`;
    let cookbooks_recipes_delete_sqlQuery = `DELETE FROM cookbooks_recipes WHERE cookbook_id = '${cookbook_id}'`;
    let recipes_delete_sqlQuery = `DELETE FROM recipes WHERE recipe_id IN (?)`;

    let cookbooks_recipes_select_sqlQuery = `SELECT recipe_id FROM cookbooks_recipes WHERE cookbook_id = '${cookbook_id}'`;
    let cookbooks_recipes_count_sqlQuery = `SELECT recipe_id, count(*) AS count FROM cookbooks_recipes WHERE recipe_id IN (?) GROUP BY recipe_id`;

    //BEGIN TRANSACTION
    conn.beginTransaction(function(err) {
      if (err) { throw err; }
      conn.query(cookbooks_recipes_select_sqlQuery, (err, results1) => {
        if(err){
          res.status(500).json({ err: 1, errMsg : err.sqlMessage, errCode : err.code})
        }else{
          let recipe_arr = [];
          results1.map(item => recipe_arr.push(item.recipe_id))
          if(recipe_arr.length > 0){
            conn.query(cookbooks_recipes_count_sqlQuery, [recipe_arr], (err, results2) => {
              if(err){
                res.status(500).json({ err: 1, errMsg : err.sqlMessage, errCode : err.code})
              }else{
                let remove_recipe_arr = [];
                results2.map(item => {
                  if(item.count === 1){
                    remove_recipe_arr.push(item.recipe_id)
                  }
                })
                let queryArr = [];

                let promise1 = new Promise((resolve, reject) => {
                  conn.query(cookbooks_delete_sqlQuery, function (err, result) {
                    if (err){
                      reject(err);
                      conn.rollback(function() {
                        console.log("promise rollback...........",err.code, err.sqlMessage);
                      });
                    }
                    else {
                      resolve(result)
                    }
                  })
                })
                queryArr.push(promise1)

                let promise2 = new Promise((resolve, reject) => {
                  conn.query(cookbooks_recipes_delete_sqlQuery, function (err, result) {
                    if (err){
                      reject(err);
                      conn.rollback(function() {
                        console.log("promise rollback...........",err.code, err.sqlMessage);
                      });
                    }
                    else {
                      resolve(result)
                    }
                  })
                })
                queryArr.push(promise2)

                let promise3 = new Promise((resolve, reject) => {
                  conn.query(recipes_delete_sqlQuery, [remove_recipe_arr], function (err, result) {
                    if (err){
                      reject(err);
                      conn.rollback(function() {
                        console.log("promise rollback...........",err.code, err.sqlMessage);
                      });
                    }
                    else {
                      resolve(result)
                    }
                  })
                })
                queryArr.push(promise3)

                Promise.all(queryArr)
                .then((result) => {
                  conn.query(`SELECT cookbook_id, cookbook_name FROM cookbooks WHERE uuid = '${_uuid}'`, (err, results) => {
                    if(err){
                      console.log("server err", err)
                      res.status(500).json({err : 1, errMsg : "Server Error"})
                      conn.rollback(function() {
                        console.log("promise rollback...........",err.code, err.sqlMessage);
                      });
                    }else{
                      res.status(200).json({success : 1, results : results});
                      conn.commit(function(err) {
                        if (err) {
                          conn.rollback(function() {
                            throw err;
                          });
                        }
                      });
                    }
                  })
                })
                .catch(err => {
                  console.log("promise all catch.........",err)
                  res.status(500).json({err: 1, errMsg : err.sqlMessage, errCode : err.code})
                  conn.commit(function(err) {
                    if (err) {
                      conn.rollback(function() {
                        throw err;
                      });
                    }
                  });
                })//promise.all catch
              }
            })
          }else{
            conn.query(cookbooks_delete_sqlQuery, (err, results) => {
              if (err){
                console.log("server err", err)
                res.status(500).json({err : 1, errMsg : "Server Error"});
                conn.rollback(function() {
                  console.log("promise rollback...........",err.code, err.sqlMessage);
                });
              }else {
                conn.query(`SELECT cookbook_id, cookbook_name FROM cookbooks WHERE uuid = '${_uuid}'`, (err, select_results) => {
                  if(err){
                    console.log("server err", err)
                    res.status(500).json({err : 1, errMsg : "Server Error"});
                    conn.rollback(function() {
                      console.log("promise rollback...........",err.code, err.sqlMessage);
                    });
                  }else{
                    res.status(200).json({success : 1, results : select_results});
                    conn.commit(function(err) {
                      if (err) {
                        conn.rollback(function() {
                          throw err;
                        });
                      }
                    });
                  }
                })
              }           
            });
          }
        }
      })
     })
  } else {
    res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
    res.end();
  }
});

router.get('/getBookmarkedRecipes', (req,res) => {
  if (req.session.loggedin) {
    let cookbookIds = req.query.cookbookIds;
    let arr = cookbookIds.split(',');
    // let sqlQuery =  `SELECT ck.cookbook_id, cr.recipe_id FROM cookbooks AS ck, cookbooks_recipes AS cr where ck.uuid = '${user_uuid}' AND ck.cookbook_id = cr.cookbook_id`;
    let sqlQuery = `SELECT cr.cookbook_id, r.recipe_id, r.recipe_name, r.image_type from cookbooks_recipes AS cr, recipes AS r WHERE r.recipe_id = cr.recipe_id and cr.cookbook_id in (?);`;
    conn.query(sqlQuery, [arr], (err, results) => {
      if (err){
        console.log("server err", err)
        res.status(500).json({err : 1, errMsg : "Server Error"});
        res.end();
      }else {
        let cookbookObj = arr.reduce((acc,curr)=> (acc[curr]=[],acc),{});
        results.map(item => {
          cookbookObj[item.cookbook_id].push({
            "recipe_id": item.recipe_id,
            "recipe_name": item.recipe_name,
            "image_type": item.image_type
          })
        })
        res.status(200).json({success : 1, results : cookbookObj});
        res.end();
      }           
    });
  }else{
    res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
    res.end();
  }
})

router.post('/bookmarkRecipe', (req, res) => {
  if (req.session.loggedin) {
    let cookbook_id = req.body.cookbook_id;
    let recipe_id = req.body.recipe_id;
    let recipe_name = req.body.recipe_name;
    let image_type = req.body.image_type;

    let cookbooks_recipes_sqlObject = {
      id : uuid.v4(),
      cookbook_id,
      recipe_id,
      createdAt : new Date(),
      updatedAt : new Date()
    }
    let cookbooks_recipes_sqlQuery = `INSERT INTO cookbooks_recipes SET ?`;
    let recipes_sqlObject = {
      recipe_id,
      recipe_name,
      image_type
    }
    let recipes_insert_sqlQuery = `INSERT INTO recipes SET ?`;
    let recipes_select_sqlQuery = `SELECT * FROM recipes WHERE recipe_id = ${recipe_id} `;

     //BEGIN TRANSACTION
     conn.beginTransaction(function(err) {
      if (err) { throw err; }
      conn.query(recipes_select_sqlQuery, (err, results) => {
        if(err){
          res.status(500).json({ err: 1, errMsg : err.sqlMessage, errCode : err.code})
        }else{
          let queryArr = []
          if(results.length === 0){
            let promise1 = new Promise((resolve, reject) => {
              conn.query(recipes_insert_sqlQuery, recipes_sqlObject, function (err, result) {
                if (err){
                  reject(err);
                  conn.rollback(function() {
                    console.log("promise rollback...........",err.code, err.sqlMessage);
                  });
                }
                else {
                  resolve(result)
                }
              })
            })
            queryArr.push(promise1)
          }

          let promise2 = new Promise((resolve, reject) => {
            conn.query(cookbooks_recipes_sqlQuery, cookbooks_recipes_sqlObject, function (err, result) {
              if (err){
                reject(err);
                conn.rollback(function() {
                  console.log("promise rollback...........",err.code, err.sqlMessage);
                });
              }
              else {
                resolve(result)
              }
            })
          })
          queryArr.push(promise2)

          Promise.all(queryArr)
          .then((result) => {
            conn.commit(function(err) {
                if (err) {
                  conn.rollback(function() {
                    throw err;
                  });
                }
                console.log('Transaction Complete.');
                // conn.end();
              });
            res.json({success : 1})
          })
          .catch(err => {
            console.log("promise all catch.........",err)
            res.status(500).json({err: 1, errMsg : err.sqlMessage, errCode : err.code})
            conn.commit(function(err) {
              if (err) {
                conn.rollback(function() {
                  throw err;
                });
              }
              console.log('Transaction Complete.');
              // conn.end();
            });
          })//promise.all catch
        }
      })
     })
    }else{//user not logged in
      res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
      res.end();
    }

});

router.post('/deleteBookmark', (req, res) => {
  if (req.session.loggedin) {
    let recipe_id = req.body.recipe_id;
    let cookbook_id = req.body.cookbook_id
    let cookbooks_recipes_select_sqlQuery = `SELECT * FROM cookbooks_recipes WHERE recipe_id = '${recipe_id}'`;
    let cookbooks_recipes_delete_sqlQuery = `DELETE FROM cookbooks_recipes WHERE recipe_id = '${recipe_id}' AND cookbook_id = '${cookbook_id}'`;
    let recipes_delete_sqlQuery = `DELETE FROM recipes WHERE recipe_id = '${recipe_id}'`;

    //BEGIN TRANSACTION
    conn.beginTransaction(function(err) {
      if (err) { throw err; }
      conn.query(cookbooks_recipes_select_sqlQuery, (err, results) => {
        if(err){
          res.status(500).json({ err: 1, errMsg : err.sqlMessage, errCode : err.code})
        }else{
          let queryArr = []
          if(results.length === 1){
            let promise1 = new Promise((resolve, reject) => {
              conn.query(recipes_delete_sqlQuery, function (err, result) {
                if (err){
                  reject(err);
                  conn.rollback(function() {
                    console.log("promise rollback...........",err.code, err.sqlMessage);
                  });
                }
                else {
                  resolve(result)
                }
              })
            })
            queryArr.push(promise1)
          }

          let promise2 = new Promise((resolve, reject) => {
            conn.query(cookbooks_recipes_delete_sqlQuery, function (err, result) {
              if (err){
                reject(err);
                conn.rollback(function() {
                  console.log("promise rollback...........",err.code, err.sqlMessage);
                });
              }else if(result.affectedRows === 0){
                let err = {
                  code : "NO_MATCHING_RESULT",
                  sqlMessage : "no entry in cookbooks_recipes"
                }
                reject(err);
                conn.rollback(function() {
                  console.log("promise rollback...........");
                });
              }else {
                resolve(result)
              }
            })
          })
          queryArr.push(promise2)

          Promise.all(queryArr)
          .then((result) => {
            conn.commit(function(err) {
                if (err) {
                  conn.rollback(function() {
                    throw err;
                  });
                }
                console.log('Transaction Complete.');
                // conn.end();
              });
            res.status(200).json({success : 1})
          })
          .catch(err => {
            console.log("promise all catch.........",err)
            res.status(500).json({err: 1, errMsg : err.sqlMessage, errCode : err.code})
            conn.commit(function(err) {
              if (err) {
                conn.rollback(function() {
                  throw err;
                });
              }
              console.log('Transaction Complete.');
              // conn.end();
            });
          })//promise.all catch
        }
      })
     })
  } else {
    res.status(400).json({err : 1, errMsg : "User Not Logged In", errCode : "UNAUTHORIZED"});
    res.end();
  }
});

module.exports = router;