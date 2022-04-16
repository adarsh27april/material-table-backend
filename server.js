const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const cors = require('cors');
const studentModel = require("./models/studentModel");

const port = process.env.PORT || 8430;

const mongoURI = process.env.mongoURI || `mongodb+srv://aks:aksDB22@cluster0.pjuwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoURI);

// middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())



app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to NodeJS-Express Backend Server<h1>")
})

app.post('/find', async (req, res) => {
    param = req.body;
    console.log(param);
    let data = await studentModel.find(param);
    if (!data) {
        // i.e. data not found in employeeData
        return res.status(404).json({
            msg: `No data, ${param}`
        })
    }

    data = data.map((item) => {
        item = {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            cgpa: item.cgpa,
            year: item.year,
        }
        return item;
    })
    console.log(data);

    res.status(200).json({ data });
})


app.post('/students', async (req, res) => {
    const { firstName, lastName, cgpa, id, year } = req.body;
    console.log(req.body);

    let student = await studentModel.findOne({ id });
    if (student) {
        console.log(student);
        return res.status(500).json({
            msg: `User with username: ${id} already exist`,
            success: false,
        })
    }

    student = new studentModel({
        firstName, lastName, cgpa, year, id
    });
    await student.save();
    student.speak();

    let data = { msg: 'register Success', firstName, success: true }
    res.status(200).json(data)
})

app.listen(port, () => {
    console.log(`server live in http://localhost:${port}`)
})
