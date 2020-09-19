const express = require('express');
import { Response } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
const path = require('path');
import twitter from './controllers/twitter';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Listener for retweets
setInterval(twitter, 2000);

// page server
app.get('/', (req: any, res: Response) => {
    res.sendFile(path.join(__dirname + '../../index.html'));
});

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});