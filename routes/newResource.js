const express = require('express');
const router = express.Router();
const { addResource } = require('../db/index')

module.exports = () => {

  router.post("/", (req, res) => {
    let resource = {
      created_by: req.cookies.user_id,
      link: req.body.link,
      description: req.body.description,
      category_id: req.body.category,
      title: req.body.title,
      screenshot: req.body.screenshot
    };
    
    console.log('FIRE0')
    addResource(resource)
    .then(function(data) {
    res.redirect('/')
  }).catch(err => {
    console.log(err)
    res
      .status(400)
      .json({ error: err.message });
  });
  })
  return router;
}

