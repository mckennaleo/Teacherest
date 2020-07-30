/* eslint-disable camelcase */
// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const bcrypt = require('bcryptjs');

//----------ROUTES----------//

const widgetsRoutes = require("./routes/widgets");
const loginRoutes = require("./routes/login");
const newResourceRoutes = require('./routes/newResource');
const keywordRoutes = require('./routes/keyword');
// const profileRoutes = require('./routes/profile')
const {
  addUser,
  getResourceById,
  getCommentsById,
  getUserWithEmail,
  toggleFavourites,
  getUserById,
  addComment } = require('./db/index');
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// app.use(express.static(__dirname + "/../public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
})); */
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/login", loginRoutes(db));
app.use("/api/newResource", newResourceRoutes(db));
app.use("/api/keyword", keywordRoutes(db));
// app.use("/api/profile"), profileRoutes(db);




// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


//-----------GETS-----------//
app.get("/", (req, res) => {
  let templateVars = { user: req.session.user_id };
  let sql = "SELECT * FROM resources";
  db.query(sql, function(err, result) {
    if (err) {
      console.log("error on req.getConnection()", err);
      res.sendStatus(500);
      return;
    } else {
      console.log('WORKS');
      res.render('index', templateVars);
    }
  });
});

app.get('/profile', (req, res) => {

  if (!req.session.user_id) {
    res.render('/errors/errorNotLogin');
  } else {
    getUserById(req.session.user_id)
      .then(result => {
        let templateVars = { user: req.session.user_id, name: result };
        console.log('WORKS');
        res.render('profile', templateVars);
      }).catch(err => {
        console.log('ERROR');
        res
          .status(500)
          .json({ error: err.message });
      });
  }

});

//when you click on a resource
app.get("/resource/:id", (req, res) => {
  const { id } = req.params;

  getResourceById(id)
    .then(result => {
      res.render('resource_view', { resource: result });
    });
});

app.post("/resource/:id/favourite", (req, res) => {
  const favourite = { user_id: req.session.user_id, resource_id: req.params.id };
  const $favouriteBtn = ('.favourite-button');

  if (!req.session.user_id) {
    res.json({ success: false });
    return;
  }

  toggleFavourites(favourite)
    .then(data => {
      res.json({ success: true });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//loads comments according to resource id
app.get("/resource/:id/comments", (req, res) => {
  const id = req.params.id;
  getCommentsById(id)
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//if signed in, allows user to post a comment on a resource
app.post("/resource/:id/comments", function(req, res) {
  const userComment = { user_id: req.session.user_id, resource_id: req.params.id, comment: req.body.text };

  if (!req.session.user_id) {
    res.json({ success: false });
    return;
  }

  addComment(userComment)
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(406)
        .json({ error: err.message });
    });
});

app.get("/register", (req, res) => {

  if (req.session.user_id) {
    res.render('errors/errorAlreadyLogin');
  } else {
    res.render("register");
  }
});

app.get("/logout", (req, res) => {

  if (!req.session.user_id) {
    res.render('errors/errorNotLogin');
  } else {
    req.session = null;
    res.redirect('/');
  }
});

app.post("/display", (req, res) => {
  let templateVars = { user: req.session.user_id };
  // console.log("This is the res: ", res)
});


//-----------APP POST----------//
app.post("/register", (req, res) => {
  let templateVars = { user: req.session.user_id };
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      const info = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        bio: req.body.bio
      };
      if (info.name === "" || info.email === "" || req.body.password === "" || info.bio === "") {
        res.redirect('/error');
      } else {
        addUser(info).then(function() {
          getUserWithEmail(info.email).then(data => {
            const users = JSON.parse(JSON.stringify(data));
            console.log(users);
            req.session.user_id = users.id;
            res.redirect('/');
          }).catch(err => {
            console.error(err);
            res
              .status(400)
              .json({ error: err.message });
          });

        }).catch(err => {
          console.error(err);
          res
            .status(400)
            .json({ error: err.message });
        });
      }
    });
  });
});

app.post("/resource/:id/comments", function(req, res) {
  if (!req.body.text) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
});

//-----------APP LISTEN-----------//
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
