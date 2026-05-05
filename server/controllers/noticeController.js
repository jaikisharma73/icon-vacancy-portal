const Notice = require('../models/Notice');

exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 });
        res.json(notices);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createNotice = async (req, res) => {
    const { title, content, date } = req.body;

    try {
        const notice = new Notice({ title, content, date });
        await notice.save();
        res.status(201).json(notice);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateNotice = async (req, res) => {
    const { id } = req.params;
    const { title, content, date } = req.body;

    try {
        const notice = await Notice.findByIdAndUpdate(
            id,
            { title, content, date },
            { new: true }
        );
        if (!notice) return res.status(404).json({ message: 'Notice not found' });
        res.json(notice);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteNotice = async (req, res) => {
    const { id } = req.params;

    try {
        const notice = await Notice.findByIdAndDelete(id);
        if (!notice) return res.status(404).json({ message: 'Notice not found' });
        res.json({ message: 'Notice deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
