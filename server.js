const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const pool = require("./databases/db");
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
const { application } = require('express');

app.use("/user", user);
app.use("/refresh", refresh);



app.listen(port, () => console.log(`Server started on port ${port}`));