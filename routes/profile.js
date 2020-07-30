const express = require('express');
const router = express.Router();
const { getResourceByCategory } = require('../db/index');

module.exports = (db) => {
  router.get("/profile", (req, res) => {

    db.query(`SELECT * FROM categories;`)
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

  router.get("/search", (req, res) => {
    const searchQuery = req.query.s;
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
