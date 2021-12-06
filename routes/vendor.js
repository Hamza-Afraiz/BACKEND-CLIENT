const {Vendor} = require('../models/vendor');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let vendor = new Vendor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName:req.body.userName,
        phone:req.body.phone,
        cnic:req.body.cnic,
        email:req.body.email,
        joiningDate:req.body.joiningDate,
        acceptedOrders:req.body.completedOrders,
        passwordHash:req.body.passwordHash,
        image:req.body.image,
        cancelledOrders:req.body.cancelledOrders,
        status:req.body.status,
        address:req.body.address,
        level:req.body.level,
        comment:req.body.comment,
        hearts:req.body.hearts,
        service:req.body.service




        
    })
    vendor = await vendor.save();

    if(!vendor)
    return res.status(400).send('the vendor cannot be created!')

    res.send(vendor);
})

router.get('/', async(req,res)=>{
    const user = await Vendor.findById(req.query.id);

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})
router.get('/all', async(req,res)=>{
    const user = await Vendor.find().limit(10);

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})
module.exports =router;