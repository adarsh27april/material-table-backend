const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    cgpa: Number,
    id: Number,
    year: Number,
})

studentSchema.methods.speak = function speak() {
    const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        cgpa: this.cgpa,
        id: this.id,
        year: this.year
    }
    console.log('data to be added to the DB: ', data);
}

const studentModel = mongoose.model('studentModel', studentSchema);

module.exports = studentModel;

