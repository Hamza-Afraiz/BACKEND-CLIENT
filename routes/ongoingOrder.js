const {OngoingOrder} = require('../models/ongoingOrder');
const express = require('express');
const router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("./roozgar-vendor-firebase-adminsdk-bevsb-a62c2d7a10.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
router.get(`/`, async (req, res) =>{
    const orderList = await OngoingOrder.find({clientId:req.query.id});

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    else{
        res.send(orderList);
    }
   
})
router.get('/appoitmentId/', async(req,res)=>{
    const user = await OngoingOrder.findById(req.query.id);

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})
router.delete('/delete1/', (req, res)=>{
    console.log("vtoken is ",req.body.vToken)
    console.log('client id is ',req.body.clientId)
    OngoingOrder.findByIdAndDelete(req.query.id).then(user =>{
        if(user) {
            const message = {
                notification:{
                    title:"Order Cancelled by Client",
                    body:"Sorry for the inconvenience",
                   
                },
                data:{
                   // clientId:'212352545253125231',
                //     clientToken:req.body.cToken,
                //     item:client.id,
                //     Lat:req.body.lat,
                //     Long:req.body.long,
                   clientId:req.body.clientId,
                //    serviceTitle:serviceTitle,
                accepted:'cancelled'
                            },
                token:req.body.vToken
            }
                admin.messaging().send(message).then(res=>{
                console.log(' notification send success')
                }).catch(err=>{
                 console.log(err)
             })
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})
router.delete('/delete/', (req, res)=>{
    OngoingOrder.findByIdAndDelete(req.query.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})
router.post('/', async (req,res)=>{

    let serviceTitle="";
        console.log('running')
       console.log(' vendor token is ',req.body.vToken)
       console.log(' client token is ',req.body.cToken)
       console.log(' client location is ',req.body.lat)
       console.log(' client id is ',req.body.clientId)
       if(!req.body.serviceTitle){
           console.log('undefined')
            serviceTitle="not defined"
       }
       else{
           console.log('else')
           serviceTitle = req.body.serviceTitle;
       }
      
      let client = new OngoingOrder({
        serviceId: req.body.serviceId,
        vendorId: req.body.vendorId,
        clientId:req.body.clientId,
        price:req.body.price,
        completionTime:req.body.completionTime,
        vendorName:req.body.vendorName,
        serviceTitle:serviceTitle,
        image:req.body.image
       
       
      
        



        
    })
    client = await client.save();

    if(!client)
    return res.status(400).send('the client cannot be created!')

    res.send(client);
  
    const message = {
    notification:{
        title:"New Request",
        body:"New request is here click to open",
       
    },
    data:{
       // clientId:'212352545253125231',
        clientToken:req.body.cToken,
        item:client.id,
        Lat:req.body.lat,
        Long:req.body.long,
       clientId:req.body.clientId,
       serviceTitle:serviceTitle,
    },
    token:req.body.vToken
}
    admin.messaging().send(message).then(res=>{
    console.log(' notification send success')
    }).catch(err=>{
     console.log(err)
 })
  
    
})
router.post('/cancel', async (req,res)=>{

   
    console.log('running')
   console.log(' vendor token is ',req.body.vToken)
   

const message = {
notification:{
    title:"Service Cancelled",
    body:"Soory for inconvenience",
   
},
data:{
   // clientId:'212352545253125231',
   
  //  clientId:req.body.clientId,
},
token:req.body.vToken
}
admin.messaging().send(message).then(res=>{
console.log(' notification send success')
}).catch(err=>{
 console.log(err)
})


})
/*router.post('/request', async (req,res)=>{
    
    let client = new OngoingOrder({
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
})*/


module.exports =router;