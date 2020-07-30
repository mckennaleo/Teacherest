// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session')
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

//----------ROUTES----------//

const widgetsRoutes = require("./routes/widgets");
const loginRoutes = require("./routes/login");
const newResourceRoutes = require('./routes/newResource');
const { addUser, getResourceById, getCommentsById, getUserWithEmail, toggleFavourites } = require('./db/index');
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
}))
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

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/login", loginRoutes(db));
app.use("/api/newResource", newResourceRoutes(db));




// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


//-----------GETS-----------//
app.get("/", (req, res) => {
  db.connect(function (err) {
    let templateVars = { user: req.session.user_id };
    if (err) throw err;
    let sql = "SELECT * FROM resources";
    db.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.render('index', templateVars);
      }
    });
  });
});

//when you click on a resource 
app.get("/resource/:id", (req, res) => {
  const { id } = req.params;
  db.connect(function (err) {
    if (err) throw err;
    getResourceById(id)
      .then(result => {
        res.render('resource_view', { resource: result });
      });
  });
});

app.post("/resource/:id/favourite", (req, res) => {
  //console.log("ARE WE HERE", req)
  // const { user_id, resource_id } = favourite;
  const favourite = { user_id: req.session.user_id, resource_id: req.params.id };

  const $favouriteBtn = ('.favourite-button');
  //add if statement to check if user is LOGGED IN
  toggleFavourites(favourite)
    .then(data => {
      res.json({ data });

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})


//loads comments according to resource id
app.get("/resource/:id/comments", (req, res) => {
  let templateVars = { user: req.session.user_id };
  const id = req.params.id;
  getCommentsById(id)
    .then(data => {
      console.log(data)
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

app.post("/resource/:id/comments", function (req, res) {
  if (!req.body.text) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
});

app.get("/register", (req, res) => {

  if (req.session.user_id) {
    res.render('errors/errorAlreadyLogin')
  } else {
    res.render("register");
  }
});

app.get("/logout", (req, res) => {

  if (!req.session.user_id) {
    res.render('errors/errorNotLogin')
  } else {
    req.session = null;
    res.redirect('/')
  }
})



app.post("/display", (req, res) => {
  let templateVars = { user: req.session.user_id };
  // console.log("This is the res: ", res)
});


//-----------APP POST----------//
app.post("/register", (req, res) => {
  let templateVars = { user: req.session.user_id };
  const { name, email, password, bio } = req.body;
  if (name === "" || email === "" || password === "" || bio === "") {
    res.redirect('/error');
  } else {
    addUser(req.body).then(function () {
      getUserWithEmail(email).then(data => {
        const users = JSON.parse(JSON.stringify(data));
        console.log(users)
        req.session.user_id = users.id;
        res.redirect('/')
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
//-----------APP LISTEN-----------//
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
