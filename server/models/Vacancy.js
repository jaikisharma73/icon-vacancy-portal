const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    interviewDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Vacancy', vacancySchema);
