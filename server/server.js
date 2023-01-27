// require framework
const express = require('express');
const app = express();

// path provides a way of working with directories and file paths
const path = require('path');

// use cross-origin resource sharing to have the frontend communicate with the backend server 
const cors = require("cors");

// use to parse cookies from frontend
const cookieParser = require('cookie-parser');

// use pool to access the database
const pool = require("./databases/db");

// set port
const port = process.env.PORT || 5050;
if (process.env.NODE_ENV === 'development') require('dotenv').config()

//connect to psql
pool.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Data logging initiated!")
    }
})

//middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '/public')));


//ROUTES
const user = require("./routers/users");
const refresh = require("./routers/refresh");
const posts = require("./routers/posts");
const images = require("./routers/images");
const classes = require("./routers/classes");

app.use("/user", user);
app.use("/refresh", refresh);
app.use("/posts", posts);
app.use("/img", images);
app.use("/classes", classes);


app.listen(port, () => console.log(`Server started on port ${port}`));