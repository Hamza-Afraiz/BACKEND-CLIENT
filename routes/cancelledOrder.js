const {CancelledOrder} = require('../models/cancelledOrder');
const {OngoingOrder} = require('../models/ongoingOrder');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let cancelledorder= new CancelledOrder({
        vendorId: req.body.vendorId,
        clientId: req.body.clientId,
        vendorName: req.body.vendorName,
        image: req.body.image,
        serviceTitle: req.body.serviceTitle,
        price: req.body.price,
        completionTime: req.body.completionTime,
      




        
    })
    cancelledorder= await cancelledorder.save();

    if(!cancelledorder)
    return res.status(400).send('the cancelledorder cannot be created!')

    res.send(cancelledorder);
})
router.post("/cancelOrder/", async (req, res) => {
    console.log(req.query.id);
   
    await OngoingOrder.findByIdAndDelete(
      req.query.id,
      async function (err, doc) {
        if (err) {
          console.log(err);
        }
        const cancelledOrder = new CancelledOrder({
         vendorId: doc.vendorId,
          clientId: doc.clientId,
          vendorName: doc.vendorName,
          image: doc.image,
          serviceTitle: doc.serviceTitle,
          price: doc.price,
          completionTime: doc.completionTime,
        });
        if (doc.serviceId) {
          cancelledOrder.serviceId = doc.serviceId;
        }
        await cancelledOrder.save();
      }
    );
  });

module.exports =router;