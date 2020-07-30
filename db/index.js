/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
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
    .catch((err) => console.log(err));
};
exports.getUserWithEmail = getUserWithEmail;

const getUserResources = function(userId) {
  return pool.query(`
  SELECT resources.*
  FROM resources
  JOIN users ON users.id = resources.created_by
  WHERE users.id = $1`, [userId])
    .then(res => res.rows)
    .catch((res, err) => res.send(err));
};
exports.getUserResources = getUserResources;

const getResourceByCategories = function(categories) {
  return pool.query(`
  SELECT resources.*
  FROM resources
  JOIN categories ON categories.id = category_id
  WHERE categories.id = ANY ($1)`, [categories])
    .then(res => res.rows)
    .catch((res, err) => console.log(res, err));
};
exports.getResourceByCategories = getResourceByCategories;

const getResourceById = function(resourceId) {
  return pool.query(`
  SELECT * 
  FROM resources
  WHERE resources.id = $1`, [resourceId])
    .then(res => res.rows[0])
    .catch((res, err) => console.log(res, err));
};
exports.getResourceById = getResourceById;

const getCommentsById = function(resourceId) {
  return pool.query(`
  SELECT comments.*, users.name as name, users.avatar_url as avatar
  FROM comments
  JOIN users ON users.id = comments.user_id
  WHERE resource_id = $1`, [resourceId])
    .then(res => res.rows)
    .catch((err) => console.log(err));
};
exports.getCommentsById = getCommentsById;

const getAllResources = function() {
  return pool.query(`
  SELECT *
  FROM resources`)
    .then(res => res.rows)
    .catch((res, err) => res.send(err));
};
exports.getAllResources = getAllResources;

const addUser = function(user) {
  let { email, name, password, bio } = user;
  return pool.query(`
  INSERT INTO users (email, name, password, bio)
  VALUES ($1, $2, $3, $4)
  RETURNING *`, [email, name, password, bio])
    .then(res => res.rows[0])
    .catch((err) => console.log(err));
};
exports.addUser = addUser;

const addResource = function(resource) {
  let { created_by, link, description, category_id, title, screenshot } = resource;
  return pool.query(`
  INSERT INTO resources (created_by, link, description, category_id, title, screenshot)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`, [created_by, link, description, category_id, title, screenshot])
    .then(res => res.rows[0])
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
exports.addResource = addResource;

const toggleFavourites = function(favourite) {
  const { user_id, resource_id } = favourite;

  return pool.query(`
  SELECT * FROM likes
  WHERE user_id = $1
  AND resource_id = $2`, [user_id, resource_id])
    .then(res => {
      if(res.rows.length > 0) {
        return pool.query(`
        DELETE FROM likes WHERE user_id = $1 AND resource_id = $2`, [user_id, resource_id]);
      } else {
        return pool.query(`
        INSERT INTO likes (user_id, resource_id)
        VALUES ($1, $2)
        RETURNING *`, [user_id, resource_id]);
      }
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
exports.toggleFavourites = toggleFavourites;

const keywordSearch = function(keyword) {  
  const formatedKeyword = '%' + keyword + '%';
  return pool.query(`
  SELECT * 
  FROM resources
  WHERE UPPER(title) LIKE UPPER($1)
  OR UPPER(description) LIKE UPPER($1);`, [formatedKeyword])
    .then(res => res.rows)
    .catch((err) => console.log(err));
};
exports.keywordSearch = keywordSearch;

const getFavoritedResources = function(user_id) {
  return pool.query(`
  SELECT resources.* 
  FROM resources
  JOIN likes ON likes.resource_id = resources.id
  JOIN users ON users.id = likes.user_id
  WHERE users.id = $1`, [ user_id ])
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
exports.getFavoritedResources = getFavoritedResources;

const getCreatedResources = function(user_id) {
  return pool.query(`
  SELECT * 
  FROM resources
  JOIN users ON users.id = resources.created_by
  WHERE users.id = $1`, [ user_id ])
    .then(res => res.rows)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
exports.getCreatedResources = getCreatedResources;

/* const getFavoritedAndCreatedResources = async function(user_id) {
  const favorited = await getFavoritedResources(user_id);
  const created = await getCreatedResources(user_id);

  return [...favorited, ...created];
};

const test = function (user_id) {
  return new Promise((resolve, reject) => {
    getFavoritedResources(user_id).then(data => {
      getCreatedResources(user_id).then(data2 => {
        resolve([data, data2]);
      });
    });
  });
}; */

const addComment = function(userComment) {
  let { user_id, resource_id, comment } = userComment;
  console.log("COMMENT CHECK", userComment.comment)
  return pool.query(`
  INSERT INTO comments (user_id, resource_id, comment)
  VALUES ($1, $2, $3)
  RETURNING *`, [user_id, resource_id, comment])
    .then(res => {
      const new_comment = res.rows[0];
      console.log("IS THIS ANYTHING", new_comment);
      return new_comment;
    })
      
    .catch((err) => console.log(err));
};
exports.addComment = addComment;

const updateUser = function(userId) {
  const queryParams = [];

  let queryString = `
  UPDATE users
  SET 
  `

  if (userId.name) {
    queryParams.push(`${userId.name}`);
    queryString += ` name = ${queryParams.length}`;
  }

  if (userId.email) {
    queryParams.push(`${userId.email}`);
    queryString += ` email = ${queryParams.length}`;
  }

  if (userId.password) {
    //does it need to be bcrytped here??
    queryParams.push(`${userId.password}`);
    queryString += ` password = ${queryParams.length}`;
  }

  if (userId.bio) {
    queryParams.push(`${userId.bio}`);
    queryString += ` bio = ${queryParams.length}`;
  }

  if (userId.avatar_url) {
    queryParams.push(`${userId.avatar_url}`);
    queryString += ` avatar_url = ${queryParams.length}`;
  }

  queryString += ` WHERE id = $1;`;

  console.log("queryString:", queryString, "queryParams:", queryParams);

  return pool.query(queryString, queryParams)
    .then(res => res.rows);

}
exports.updateUser = updateUser;