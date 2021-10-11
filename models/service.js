const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
       
        
    },
    vendorName:{
        type: String,
        default:"name here"

    },
    description: {
        type: String,
        default:"detail here"

    
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default:''
        
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        default:''

    },
    availibility: {
        type: String,
        default:"avialibility here"
    
    },
    hearts: {
        type: String,
        default: '0',
    },
    numComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    
    }],
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

serviceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

serviceSchema.set('toJSON', {
    virtuals: true,
});


exports.Service = mongoose.model('service', serviceSchema);
