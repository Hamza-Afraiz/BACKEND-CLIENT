const {Address} = require('../models/address');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let address= new Address({
      
      city:req.body.city




        
    })
    address= await address.save();

    if(!address)
    return res.status(400).send('the address cannot be created!')

    res.send(address);
})

module.exports =router;