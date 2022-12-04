const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./databases/db");
if (process.env.NODE_ENV === 'development') require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json());

pool.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Data logging initiated!")
    }
})

//ROUTES
const user = require("./routers/users");

app.use("/user", user);

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server started on port ${port}`));