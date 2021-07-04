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
app.use('/images', express.static(__dirname + '../../src/assets/images'));
app.use('/css', express.static(__dirname + '../../src/assets/css'));
app.set('/views', path.join(__dirname, '../../src/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '../../src/public'));

// page server
app.get('/', (req: any, res: Response) => {
    res.render(path.join(__dirname + '../../src/views/pages/home'));
});

app.get('/finance', (req: any, res: Response) => {
    res.render(path.join(__dirname + '../../src/views/pages/personalFinance'));
});

app.get('/house_hacking', (req: any, res: Response) => {
    res.render(path.join(__dirname + '../../src/views/pages/houseHacking'));
});

app.get('/screening_tenant', (req: any, res: Response) => {
    res.render(path.join(__dirname + '../../src/views/pages/screeningTenants'));
});

app.get('/rental_application', (req: any, res: Response) => {
    res.render(path.join(__dirname + '../../src/views/Rental Application.pdf'));
});

app.get('/first_house', (req: any, res: Response) => {
    res.render(path.join(__dirname + '../../src/views/pages/firstHouse'));
});

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});