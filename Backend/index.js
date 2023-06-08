const express = require('express');
const connect = require('./database/db.js');
const Router = require('./routes/route.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.use(cors(
    {
        origin:"http://localhost:4200"
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/',Router);

connect();

app.listen(port , () => console.log(`server running sucessfully on port ${port}`));