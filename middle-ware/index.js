const express = require("express");
const app = express();
const mongoose = require("mongoose");
const  cors = require('cors')
const logger = require('./logger');

//Routes
const usersRoute = require("./routes/usersRouter")

//Middleware
app.use(cors()) //enables cors
app.use(express.urlencoded({extended: true})); //body parser
app.use(express.json()); //body parser
app.use(logger); //logger
app.use('/users', usersRoute); //user routes

//Connect to debugger
mongoose
  .connect("mongodb://localhost/users", {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB: " + err));

app.listen(3000);