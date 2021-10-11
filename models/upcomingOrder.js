const mongoose = require('mongoose');

const upcomingOrderSchema = mongoose.Schema({
   
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        
    },
   
clientName:{
    type:String,
    default:'hamza'
},
image:{
    type:String,
    default:'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip'
},
description:{
    type:String,
    default:'car check up'
}
    ,
    priceOffered:{
       type:String,
       default:'300'
    },
    completionTime:{
        type:String,
        default:'1 hour'
    },
    selectedTime:{
        type:String,
        default:'1 hour'
    },
    selectedDay:{
        type:String,
        default:'1 hour'
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

upcomingOrderSchema .virtual('id').get(function () {
    return this._id.toHexString();
});

upcomingOrderSchema.set('toJSON', {
    virtuals: true,
});


exports.UpcomingOrder = mongoose.model('upcomingOrder', upcomingOrderSchema );
