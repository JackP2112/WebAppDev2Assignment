import dotenv from 'dotenv';
import express from 'express';
import mediaRouter from './api/media';
import './db';
import loadMedia from './mediaData';
import bodyParser from 'body-parser';

dotenv.config()

if (process.env.seedDb) {
  loadMedia();
}

const app = express();

const port = process.env.PORT;

//configure body-parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api/media', mediaRouter);
app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
