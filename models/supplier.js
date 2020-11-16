const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
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

const Supplier = mongoose.model('suppliers', supplierSchema);

module.exports = Supplier;