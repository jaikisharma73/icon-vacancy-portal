const Vacancy = require('../models/Vacancy');
const fs = require('fs');
const path = require('path');

exports.getVacancies = async (req, res) => {
    try {
        const vacancies = await Vacancy.find().sort({ interviewDate: 1 });
        res.json(vacancies);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createVacancy = async (req, res) => {
    const { companyName, interviewDate, description } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!imageUrl) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        const vacancy = new Vacancy({
            companyName,
            interviewDate,
            description,
            imageUrl
        });
        await vacancy.save();
        res.status(201).json(vacancy);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateVacancy = async (req, res) => {
    const { id } = req.params;
    const { companyName, interviewDate, description } = req.body;
    
    try {
        const vacancy = await Vacancy.findById(id);
        if (!vacancy) return res.status(404).json({ message: 'Vacancy not found' });

        vacancy.companyName = companyName || vacancy.companyName;
        vacancy.interviewDate = interviewDate || vacancy.interviewDate;
        vacancy.description = description || vacancy.description;

        if (req.file) {
            vacancy.imageUrl = req.file.path;
        }

        await vacancy.save();
        res.json(vacancy);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteVacancy = async (req, res) => {
    const { id } = req.params;

    try {
        const vacancy = await Vacancy.findById(id);
        if (!vacancy) return res.status(404).json({ message: 'Vacancy not found' });

        await Vacancy.findByIdAndDelete(id);
        res.json({ message: 'Vacancy deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
