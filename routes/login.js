const express = require('express');
const router = express.Router();
const { getUserWithEmail } = require('../db/index');
const bcrypt = require('bcryptjs');


module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('QUERIES:    ', req.body);
    
    getUserWithEmail(email)
      .then(data => {
        const users = JSON.parse(JSON.stringify(data));
        console.log("USERS", users);
        
        if (bcrypt.compareSync(password, users.password) === true) {
          req.session.user_id = users.id;
          res.send();
        } else {
          console.log('FAILED')
        }
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

