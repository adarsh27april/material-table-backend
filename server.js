const morgan = require('morgan')
require('dotenv').config()

const mongoose = require('mongoose');
// const salaryModel = require("./models/report");

const express = require("express");
const userRouter = require('./routes/_users')
const reportRouter = require('./routes/_report')

const app = express();
const cors = require('cors');

const port = process.env.client_port || 8430;

//mongoDB
const mongoURI = process.env.mongoURI || `mongodb://localhost:27017/material-table`
mongoose.connect(mongoURI);

// middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

//middleware for routes => ./routes
app.use('/users', userRouter)
app.use('/report', reportRouter)

app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to NodeJS-Express Backend Server<h1>")
})


app.listen(port, () => {
    console.log(`server live in http://localhost:${port}`)
})