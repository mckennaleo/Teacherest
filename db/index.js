const { Pool } = require('pg');

const pool = new Pool({
  users: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/// Users

//CREATE THESE FUNCTIONS
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1`, [email])
    .then(res => res.rows[0])
    .catch(err => res.send(err));
};
exports.getUserWithEmail = getUserWithEmail;

const getUserResources = function(userId) {
  return pool.query(`
  SELECT resources.*
  FROM resources
  JOIN users ON users.id = resources.created_by
  WHERE users.id = $1`, [userId])
    .then(res => res.rows)
    .catch(err => res.send(err));
};
exports.getUserResources = getUserResources;

const getResourceByCategory = function(category) {
  return pool.query(`
  SELECT resources.*
  FROM resources
  WHERE category_id = $1`, [category])
    .then(res => res.rows)
    .catch(err => res.send(err));
};
exports.getResourceByCategory = getResourceByCategory;

//SHOULD THIS BE A QUERY?
const getAllResources = function() {
  return pool.query(`
  SELECT *
  FROM resources`)
    .then(res => res.rows)
    .catch(err => res.send(err));
};
exports.getAllResources = getAllResources;

const addUser = function(user) {
  let { email, name, password } = user;
  return pool.query(`
  INSERT INTO users (email, name, password)
  VALUES ($1, $2, $3)
  RETURNING *`, [email, name, password])
    .then(res => res.rows[0])
    .catch(err => res.send(err));
};
exports.addUser = addUser;

const addResource = function(resource) {
  let { created_by, link, description, category_id, title, screenshot } = resource;
  return pool.query(`
  INSERT INTO resources (created_by, link, description, category_id, title, screenshot)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`, [created_by, link, description, category_id, title, screenshot])
    .then(res => res.rows[0])
    .catch(err => res.send(err));
};
exports.addResource = addResource;


