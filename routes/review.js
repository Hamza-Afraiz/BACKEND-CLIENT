const {Review} = require('../models/review');
const express = require('express');
const router = express.Router();
router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.id) {
        filter = { vendorId: req.query.id };
    }

    const service = await Review.find(filter).populate('vendorId');

    if (!service) {
        res.status(500).json({ success: false });
    }
    res.send(service);
});


router.post('/',  (req,res)=>{
 Review.findOne({clientId:req.body.clientId,appoitmentId:req.body.appoitmentId}).then(user =>{
        if(user) {
            console.log('if scene');
            return res.status(404).json({success: true, message: 'already reviewed!'})
        } else {
            console.log('else scene');
            let comment = new  Review({
                clientId: req.body.clientId,
                vendorId: req.body.vendorId,
                serviceId: req.body.serviceId,
                rating:req.body.rating,
               description:req.body.textarea,
               vendorName: req.body.vendorName,
               clientName: req.body.clientName,
               appoitmentId: req.body.appoitmentId,
              
        
        
        
        
                
            }).populate(['clientId,vendorId,serviceId'])
            comment =comment.save();
        
            if(!comment)
            return res.status(400).send('the review cannot be created!')
            console.log("comment is ",comment)
            res.send(comment);
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
    
    
})

module.exports =router;