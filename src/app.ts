const express = require('express');
import { Response } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('finance'));
app.use(express.static('index'));
app.use('/images', express.static(__dirname + '../../src/assets/images'));
app.use('/css', express.static(__dirname + '../../src/assets/css'));

// page server
app.get('/', (req: any, res: Response) => {
    res.sendFile(path.join(__dirname + '../../index.html'));
});

app.get('/finance', (req: any, res: Response) => {
    res.sendFile(path.join(__dirname + '../../src/views/personal_finance.html'));
});

app.get('/house_hacking', (req: any, res: Response) => {
    res.sendFile(path.join(__dirname + '../../src/views/house_hacking.html'));
});

app.get('/screening_tenant', (req: any, res: Response) => {
    res.sendFile(path.join(__dirname + '../../src/views/screening_tenant.html'));
});

app.get('/rental_application', (req: any, res: Response) => {
    res.sendFile(path.join(__dirname + '../../src/views/Rental Application.pdf'));
});

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});