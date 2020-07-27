/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getAllResources } = require('../db/index');

module.exports = (db) => {
  router.get("/all", (req, res) => {
    console.log("WHAT IS THIS:", req.body)
    //let query = `SELECT * FROM resources`;
    getAllResources(req)
      .then(data => {
        //data = query response from getAllResources!
        console.log(data)
        res.json({ data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  
  return router;
};
