/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getAllResources } = require('../db/index');
const { getResourceByCategories } = require('../db/index');
const { getCreatedResources } = require('../db/index');
const { getFavoritedResources } = require('../db/index');

module.exports = (db) => {
  router.get("/all", (req, res) => {
    getAllResources(req)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/filter", (req, res) => {
    const categoryIds = req.query.categories || [];

    getResourceByCategories(categoryIds)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/created_resources", (req, res) => {
    const userId = req.session.user_id;

    getCreatedResources(userId)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/favored_resources", (req, res) => {
    const userId = req.session.user_id;

    getFavoritedResources(userId)
      .then(data => {
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
