const {Client} = require('../models/client');
const {Receipt} = require('../models/receipt');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twilioAccountSid = "AC8c329ffc0ad4b7cd85b10e9004836408";
const tiwiloAuthToken = process.env.auth_token;
const twilioClient = require("twilio")(twilioAccountSid, tiwiloAuthToken)
router.get(`/getReceipt/`, async (req, res) => {
  let filter = {};
  if (req.query.id) {
      filter = { id: req.query.id };
  }

  const service = await Receipt.findById(req.query.id);

  if (!service) {
      res.status(500).json({ success: false });
  }
  res.send(service);
});
router.get(`/getReceiptByAppoitmentId/`, async (req, res) => {
  let filter = {};
  if (req.query.id) {
      filter = { orderId: req.query.id };
  }

  const service = await Receipt.findOne(filter);
  console.log("service is ",service)

  if (!service) {
      res.status(500).json({ success: false });
  }
  else{
    res.send(service);
  }
  
});
router.post("/sendOTP", async (req, res) => {
    twilioClient.messages
      .create({
        body: `Welcome to ROOZGAR Client. Your SMS verification code is: ${req.body.otp}`,
        from: "+12565674182",
        to: `+92${req.body.phoneNumber}`,
      })
      .then((message) => {
        res.send(message);
      });
  });

router.post('/register', async (req,res)=>{
    console.log("usernaem is ",req.body.userName)
    console.log("phone number is ",req.body.phoneNumber)
    let filter = {};
    if(!req.query.id){
        filter = { phone:req.body.phoneNumber,userName:req.body.userName };
    console.log("not query")

    }
    console.log("filter us ",filter)
    
    console.log("usernaem is ",req.body.userName)
    const user = await Client.findOne({userName:req.body.userName});
    const secret = process.env.secret;
    console.log("user is ",user)
    if(user) {
        return res.status(400).send('This user already exist');
    }
    let user2 = await Client.findOne({phone:req.body.phoneNumber})
    if(user2) {
        console.log("user2 is ",user2)
        return res.status(400).send('This phone already exist');
    }
    console.log("user2 is ",user2)

    let client = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName:req.body.userName,
        phone:req.body.phoneNumber,
        cnic:req.body.cnic,
        email:req.body.email,
        image:req.body.image,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
       
       
      
        



        
    })
    client = await client.save();

    if(!client)
    return res.status(400).send('the client cannot be created!')

    res.send(client);
})

router.get(`/`, async (req, res) =>{
    const userList = await Client.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

router.get('/:id', async(req,res)=>{
    const user = await Client.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})
router.post('/checkPhoneNumber', async(req,res)=>{
    console.log('phone number is ' + req.body.checkNumber)
    const user = await Client.findOne({phone:req.body.checkNumber});

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    else{
        res.status(200).send(user);}
})


router.put("/changePassword/", async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    var vendor = await Client.findById(req.query.id);
    if (!vendor) {
      return res.send({ error: "Vendor must be signed in for this purpose!" });
    }
    try {
      if (bcrypt.compareSync(oldPassword, vendor.passwordHash)) {
        if (newPassword.localeCompare(confirmNewPassword) === 0) {
          vendor = await Client.findOneAndUpdate(
            { _id: vendor._id },
            {
              passwordHash: await bcrypt.hashSync(newPassword, 10),
            },
            {
              new: true,
            }
          );
          await vendor.save();
         // const token = jwt.sign({ vendorId: vendor._id }, jwtKey);
          return res.send({
            success: "Password has been updated!",
            //token: token,
          });
        } else {
          return res.send({ error: "New passwords don't match!" });
        }
      } else {
        return res.send({ error: "Current password entered is invalid!" });
      }
    } catch (err) {
      return res.send(err.message);
    }
  });
  router.put("/changePassword2/", async (req, res) => {
    const {  newPassword, confirmNewPassword } = req.body;
    var vendor = await Client.findById(req.query.id);
    if (!vendor) {
      return res.send({ error: "Vendor must be signed in for this purpose!" });
    }
    try {
    
        if (newPassword.localeCompare(confirmNewPassword) === 0) {
          vendor = await Client.findOneAndUpdate(
            { _id: vendor._id },
            {
              passwordHash: await bcrypt.hashSync(newPassword, 10),
            },
            {
              new: true,
            }
          );
          await vendor.save();
         // const token = jwt.sign({ vendorId: vendor._id }, jwtKey);
          return res.send({
            success: "Password has been updated!",
            //token: token,
          });
        } else {
          return res.send({ error: "New passwords don't match!" });
        }
      
    } catch (err) {
      return res.send(err.message);
    }
  });

router.put('/:id',async (req, res)=> {

    const userExist = await Client.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await Client.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.post('/login', async (req,res) => {
    const user = await Client.findOne({phone: req.body.phoneNumber});
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
               
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})



router.delete('/:id', (req, res)=>{
    Client.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const userCount = await Client.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

module.exports =router;