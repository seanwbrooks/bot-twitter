const express = require('express');
import { Response } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = express();
const port = 3000;
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const twitterApi = () => {
    console.log("Twitter api pull for hashtag");
}
setInterval(twitterApi, 10000);

app.get('/', (req: any, res: Response) => {
    res.status(200).send("Twitter bot endpoint");
});

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
});