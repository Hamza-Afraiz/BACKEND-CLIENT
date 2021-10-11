const {UpcomingOrder} = require('../models/upcomingOrder');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const orderList = await UpcomingOrder.find();

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})
router.post('/', async (req,res)=>{
    
    let client = new UpcomingOrder({
        
        clientId:req.body.clientId,
        priceOffered:req.body.priceOffered,
        completionTime:req.body.completionTime,
        selectedTime:req.body.selectedTime,
        selectedDay:req.body.selectedDay,
        clientName:req.body.clientName,
        description:req.body.description
        
      
       
       
      
        



        
    })
    client = await client.save();

    if(!client)
    return res.status(400).send('the client cannot be created!')

    res.send(client);
})
router.get(`/clientId`, async (req, res) => {
    let filter = {};
    if (req.query.id) {
        console.log("req has id",req.query.id)
        filter = { clientId: req.query.id };
    }

    const service = await UpcomingOrder.find(filter).populate('clientId');

    if (!service) {
        res.status(500).json({ success: false });
    }
    res.send(service);
});


module.exports =router;