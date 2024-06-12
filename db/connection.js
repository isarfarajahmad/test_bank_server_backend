const mongoose = require('mongoose');

const DB = "your db location";

mongoose.connect(DB).then(() => {
    console.log('Connection Success !');
}).catch((err) => {
    console.log('No Active Connection');
})