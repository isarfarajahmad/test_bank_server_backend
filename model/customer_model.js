const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    "customer_name": {
        type: String,
        required: true,
        trim: true
    },
    "account_number": {
        type: String,
        required: true,
        trim: true
    },
    "address": {
        type: String,
        required: true,
        trim: true
    },
    "document": {
        type: String
    },
});

const My_Customers = new mongoose.model('customers', customerSchema);

module.exports = My_Customers;