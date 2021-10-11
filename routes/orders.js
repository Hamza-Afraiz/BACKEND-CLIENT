const {AcceptedOrder} = require('../models/acceptedOrder');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const orderList = await AcceptedOrder.find();

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})
router.post('/', async (req,res)=>{
    
    let client = new AcceptedOrder({
        serviceId: req.body.serviceId,
        vendorId: req.body.vendorId,
        clientId:req.body.clientId,
        price:req.body.price,
        completionTime:req.body.completionTime,
        vendorName:req.body.vendorName,
        serviceTitle:req.body.serviceTitle,
        image:req.body.image
       
       
      
        



        
    })
    client = await client.save();

    if(!client)
    return res.status(400).send('the client cannot be created!')

    res.send(client);
})


module.exports =router;