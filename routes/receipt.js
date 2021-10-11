const {Receipt} = require('../models/receipt');
const express = require('express');
const router = express.Router();
router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.id) {
        filter = { vendorId: req.query.id };
    }

    const service = await Receipt.find(filter);

    if (!service) {
        res.status(500).json({ success: false });
    }
    res.send(service);
});