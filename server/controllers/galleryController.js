const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

exports.getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({ createdAt: -1 });
        res.json(gallery);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createGallery = async (req, res) => {
    const { caption } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!imageUrl) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        const item = new Gallery({ caption, imageUrl });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateGallery = async (req, res) => {
    const { id } = req.params;
    const { caption } = req.body;

    try {
        const item = await Gallery.findById(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.caption = caption || item.caption;

        if (req.file) {
            item.imageUrl = req.file.path;
        }

        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteGallery = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Gallery.findById(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await Gallery.findByIdAndDelete(id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
