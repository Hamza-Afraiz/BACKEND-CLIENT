const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
       // required: true,
    },
    lastName: {
        type: String,
        ///required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        default:''
    },
    cnic: {
        type: String,
        default:''
    },
    passwordHash: {
        type: String,
        default:''
    },
  /*  address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        default:''
    },*/
    phone: {
        type: String,
        default:''
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
   
    image:{
        type:String,
        default:'https://thumbs.dreamstime.com/b/client-member-icon-splash-natural-blue-round-button-isolated-abstract-illustration-142316739.jpg'
    },
 

    status:{
        type:String,
        default:''
    }

});

clientSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

clientSchema.set('toJSON', {
    virtuals: true,
});

exports.Client = mongoose.model('client', clientSchema);
exports.clientSchema = clientSchema;
