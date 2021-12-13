const {SubCategory} = require('../models/SubCategory');
const express = require('express');
const router = express.Router();
const axios = require('axios');
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
router.post("/getSubCategories/", async (req, res) => {
    try {
      const subCategories = await SubCategory.find();
      subCategoryNames = [];
      for (let i = 0; i < subCategories.length; i++) {
        subCategoryNames[i] = subCategories[i].title;
        console.log(subCategories)
      }
      let payload = { sentence: req.body.sentence, categories: subCategoryNames, threshold: 2 };
  
      let response = await axios.post('http://18bc-37-111-134-191.ngrok.io/nlp', payload);
      
      var similar_subCategories = response.data.similar_subCategories;
  
      const filtered_subCategories = [];
  
      for ( var subCategoryTitle in similar_subCategories ) {
        filtered_subCategories.push(subCategories.find(subCategory => subCategory.title === subCategoryTitle));
      }
  
      res.send({similar_subCategories: filtered_subCategories});
  
    } catch (err) {
      return res.send(err.message);
    }
  });


module.exports =router;