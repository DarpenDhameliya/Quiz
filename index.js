const cors = require('cors');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const port = process.env.PORT || 8001;
const { api } = require('./api');
const db = require('./db/db');
const app = express();

app.use(express.static("files"));
app.use('*',cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api);

app.listen(port, () => console.log(`listening on port ${port}`));
