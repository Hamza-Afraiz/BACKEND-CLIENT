const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let category= new Category({
       name:req.body.name
      




        
    })
    category= await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})
router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
})

module.exports =router;