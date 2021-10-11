const {Complaint} = require('../models/complaint');
const express = require('express');
const router = express.Router();
router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.id) {
        filter = { clientId: req.query.id,status:'completed' };
    }

    const service = await Complaint.find(filter);

    if (!service) {
        res.status(500).json({ success: false });
    }
    res.send(service);
});
router.get(`/notAnswered`, async (req, res) => {
    let filter = {};
    if (req.query.id) {
        filter = { clientId: req.query.id,status:'Not Checked' };
    }

    const service = await Complaint.find(filter);

    if (!service) {
        res.status(500).json({ success: false });
    }
    res.send(service);
});

router.post('/', async (req,res)=>{
    
    let client = new Complaint({
        serviceId: req.body.serviceId,
        vendorId: req.body.vendorId,
        clientId:req.body.clientId,
       
        vendorName:req.body.vendorName,
        serviceTitle:req.body.serviceTitle,
        image:req.body.image,
        description:req.body.description,
        type:req.body.type,
       
       
      
        



        
    })
    client = await client.save();

    if(!client)
    return res.status(400).send('the client cannot be created!')

    res.send(client);
})


module.exports =router;