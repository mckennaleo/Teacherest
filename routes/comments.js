const express = require('express');
const router  = express.Router();
const { getCommentsById } = require('../db/index');

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log("WHAT IS THIS:", res);
    console.log("QUESTCEQUE:", req.params);
    //let query = `SELECT * FROM resources`;
    const id = req.query.id;
    getCommentsById(id)
      .then(data => {
        //data = query response from getAllResources!
        // console.log(data)
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
