/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const { addResource } = require('../db/index');

module.exports = () => {

  router.post("/", (req, res) => {
    console.log("CQOIT?", res)
    const loggedIn = { user_id: req.session.user_id }
    let resource = {
      // eslint-disable-next-line camelcase
      created_by: req.session.user_id,
      link: req.body.link,
      description: req.body.description,
      category_id: req.body.category,
      title: req.body.title,
      screenshot: req.body.screenshot
    };

    addResource(resource)
      .then(function(data) {
        console.log("WHAT???", data)
        res.redirect('/');
      }).catch(err => {
        console.error(err);
        res
          .status(400)
          .json({ error: err.message });
      });
  });
  return router;
};

