const express = require('express');
import { Response } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
const path = require('path');

const app = express();
const port = 3000;
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: any, res: Response) => {
    console.log(__dirname + '/index.html');
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
});