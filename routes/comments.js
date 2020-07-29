const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/comments", (req, res) => {
    // console.log("WHAT IS THIS:", req.body)
    //let query = `SELECT * FROM resources`;
    getAllResources(req)
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
