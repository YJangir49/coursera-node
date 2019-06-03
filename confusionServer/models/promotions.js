
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const promoSchema = new Schema ({
    name:{
        type: String,
        require: true,
        unique: true
    },
    image:{
        type: String,
        require: true,
    },
    label:{
        type: String,
        default: ''    
    },
    price:{
        type: Currency,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    featured:{
        type: Boolean,
        default : false
    }

},{
    timestamps: true
})

const Promos = mongoose.model('Promo', promoSchema);

module.exports = Promos;