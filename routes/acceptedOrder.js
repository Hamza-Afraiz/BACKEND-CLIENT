const {AcceptedOrder} = require('../models/acceptedOrder');
const express = require('express');
const router = express.Router();
router.get('/appoitmentId/', async(req,res)=>{
  const user = await AcceptedOrder.findById(req.query.id);

  if(!user) {
      res.status(500).json({message: 'The user with the given ID was not found.'})
  } 
  res.status(200).send(user);
})
router.get('/', async(req,res)=>{
  console.log('get by id')
  const user = await AcceptedOrder.find({clientId:req.query.id});

  if(!user) {
      res.status(500).json({message: 'The user with the given ID was not found.'})
  } 
  else{
    res.status(200).send(user);
  }
 
})
router.post('/', async (req,res)=>{
    let acceptedorder= new AcceptedOrder({
      price:req.body.price
      




        
    })
    acceptedorder= await acceptedorder.save();

    if(!acceptedorder)
    return res.status(400).send('the acceptedorder cannot be created!')

    res.send(acceptedorder);
})

module.exports =router;