
const express = require('express');
const router = express.Router();
const { getUserWithEmail } = require('../db/index');

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

  router.get("/login", (req, res) => {
    const searchQuery = req.query.s;
    console.log(req.query.s);
    /* db.query(`SELECT * FROM categories WHERE name ILIKE $1;`, [searchQuery]) */
    getResourceByCategory(searchQuery)
      .then(data => {
        const categories = data.rows;
        res.json({ categories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

