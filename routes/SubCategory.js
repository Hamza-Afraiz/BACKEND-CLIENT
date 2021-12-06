const {SubCategory} = require('../models/SubCategory');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let category= new SubCategory({
       name:req.body.name
      




        
    })
    category= await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})
router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.id) {
        filter = { category: req.query.id };
    }

    const service = await SubCategory.find(filter).populate('category');

    if (!service) {
        res.status(500).json({ success: false });
    }
    res.send(service);
});
router.get(`/all`, async (req, res) => {
   

    const service = await SubCategory.find().limit(6);

    if (!service) {
        res.status(500).json({ success: false });
    }
    res.send(service);
});


module.exports =router;