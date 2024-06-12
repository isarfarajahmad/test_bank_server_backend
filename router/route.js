const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

require('../db/connection');

cloudinary.config({
    cloud_name: "cloud_name",
    api_key: "api_key",
    api_secret: "api_secret",
    secure: true
});

const MyCustomers = require('../model/customer_model');

router.get('/', (req, res) => {
    res.send('Welcome from Bank Server');
})

router.post('/add_customer', (req, res) => {
    try{
        const file = req.files.document;
        cloudinary.uploader.upload(file.tempFilePath, {folder: 'Bank'}, async (err, result) => {
            console.log("Document Uploaded Successfully");
            const addingCustomer = new MyCustomers({
                customer_name:req.body.customer_name,
                account_number:req.body.account_number,
                address:req.body.address,
                document:result.url,
            });
            const insertCustomer = await addingCustomer.save();
            res.status(201).send(insertCustomer);
        });
    } catch (err) {
        res.send(400).send(e);
    }
})

router.get('/customers', async(req, res) => {
    try {
        const getCustomers = await MyCustomers.find({});
        res.status(201).send(getCustomers);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/customer/:account_number', async(req, res) => {
    try {
        const account_number = req.params.account_number;
        const getCustomer = await MyCustomers.find({account_number: account_number});
        res.send(getCustomer);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;