// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

const cookieParser = require('cookie-parser');


const widgetsRoutes = require("./routes/widgets");
const categoriesRoutes = require("./routes/categories");
const loginRoutes = require("./routes/login");
const {addUser, getResourceById} = require('./db/index')
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
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/categories", categoriesRoutes(db));
app.use("/api/login", loginRoutes(db));


// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


//-----------GETS-----------//
const showResources = (db) => {
  let resourceList = {};
  for (let objects in db) {
    resourceList[objects] = db[objects];
  }
  return resourceList;
};




app.get("/", (req, res) => {
  db.connect(function(err) {
    console.log(req)
    let templateVars = {user: req.cookies.user_id}
    if (err) throw err;
    let sql = "SELECT * FROM resources";
    db.query(sql, function(err, result) {
      if (err) {
        throw err;
      } else {
        res.render('index');
      }
    });
  });
});

//when you click on a resource, 
app.get("/resource/:id", (req, res) => {
  db.connect(function(err) {
    if (err) throw err;
    const { id } = req.params;
    getResourceById(id)
    .then(res => {
      console.log("IS THIS IT:", res)
      res.render(`resource_view`);
    })
    // const dbQuery = getResourceById(id);
    // console.log("REQ.PARAMS", id)
    // db.query(dbQuery, function(err, result) {
    //   if (err) {
    //     throw err;
    //   } else {
    //     result = JSON.parse(JSON.stringify(result))
    //     console.log('WHAT IS THIS????????', result)
    //     
    //   }
    // });
  });
});


app.get("/register", (req, res) => {
  const user = req.cookies.user_id;
  if (user) {
    let templateVars = {user: user}
    res.render(templateVars, "register");
    
  } else {
    res.render("alreadyLoggedInError")
  }
});


app.post("/display", (req, res) => {
  // console.log("This is the res: ", res)
});


//-----------APP POST----------//
app.post("/register", (req, res) => {
  const {name, email, password, bio} = req.body;
  if (name === "" || email === "" || password === "" || bio === "") {
    res.redirect('/error')
  } else {
    addUser(req.body);
    res.redirect('/')
  }
  
});
//-----------APP LISTEN-----------//
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
