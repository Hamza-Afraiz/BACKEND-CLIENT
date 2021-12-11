const {Review} = require('../models/review');
const express = require('express');
const router = express.Router();
const fs = require("fs");
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



// list of trigger words obtained from: http://www2.imm.dtu.dk/pubdb/pubs/6010-full.html

const filename = "triggerwords.txt";

const qualifiedFilename = process.cwd() + "/" + filename;

var contents = fs.readFileSync(qualifiedFilename, "utf8").split("\n");

const trigger_words = contents.map((word) => word.toLocaleLowerCase());

// use the function below to detect trigger words in a sentence.
const includes_trigger_word = (sentence) => {
  const str = sentence.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
  const tokens = str.split(" ").map((word) => word.toLocaleLowerCase());
  console.log(tokens);
  return tokens.filter((value) => trigger_words.includes(value)).length !== 0
    ? true
    : false;
};



router.post('/',  (req,res)=>{
    console.log(includes_trigger_word(req.body.textarea));
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