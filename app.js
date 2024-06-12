const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
app.use(cors({
    origin : true,
    credentials : true,
    methods : 'POST,GET,PUT,OPTIONS,DELETE,PATCH'
}));
const PORT = 4000;

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true
}))
app.use(require('./router/route'));

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and listening on PORT "+PORT)
    else
        console.log("Server can not start due to this error "+error)
})