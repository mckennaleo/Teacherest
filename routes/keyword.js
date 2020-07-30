const express = require('express');
const router = express.Router();
const { keywordSearch } = require('../db/index');

module.exports = (db) => {
  router.post("/", (req, res) => {
    const keyword = req.body.keyword;
    keywordSearch(keyword)
      .then(data => {
        const search = data;
        console.log(data);
        res.json({ search });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};