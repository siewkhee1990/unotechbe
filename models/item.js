const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
    },
    suppliers: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    weight: {
        type: Number,
    },
    dimension: {
        type: String,
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
    },
    manufacturer: {
        type: String,
    },
    category: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    createdOn: {
        type: Date,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    lastUpdatedDate: {
        type: Date,
    }
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item;